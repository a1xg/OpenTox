import requests
from bs4 import BeautifulSoup
import math
import csv
import time
import collections
import re
import math
import random
from multiprocessing import Pool
import pandas as pd
from lxml import etree, html as lhtml
# An example of implementation of a parser for multi-page web catalogs.
# Parsing is carried out in 2 stages:
# Parsing the directory of links to pages: get_url_list(url)
# Parsing the necessary content from the pages for each link:
# get_data(csv_file)

def get_html(page, rows_per_page=None):
    """Web page request"""
    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                             ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
    #url = f'https://echa.europa.eu/information-on-chemicals/cl-inventory-database?p_p_id=dissclinventory_WAR_dissclinventoryportlet&' \
    #      f'p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&' \
    #      f'_dissclinventory_WAR_dissclinventoryportlet_jspPage=%2Fhtml%2Fsearch%2Fsearch.jsp&' \
    #      f'_dissclinventory_WAR_dissclinventoryportlet_searching=true&_dissclinventory_WAR_dissclinventoryportlet_iterating=true' \
    #      f'&_dissclinventory_WAR_dissclinventoryportlet_criteriaParam=_dissclinventory_WAR_dissclinventoryportlet_criteriaKeyGQTs' \
    #      f'&_dissclinventory_WAR_dissclinventoryportlet_delta={rows_per_page}&_dissclinventory_WAR_dissclinventoryportlet_orderByCol=CLD_NAME' \
    #      f'&_dissclinventory_WAR_dissclinventoryportlet_orderByType=asc&_dissclinventory_WAR_dissclinventoryportlet_resetCur=false' \
    #      f'&_dissclinventory_WAR_dissclinventoryportlet_cur={page}'
    url = f'https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/{page}'
    r = requests.get(url, headers=headers, params=None)
    # Recognize the page encoding and set its value for decoding
    r.encoding = r.apparent_encoding
    return r

def parse_index_catalogue(html, num_page, rows_per_page):
    """Module for extracting the catalog of links (index) to pages that need to be parsed in the future."""
    start = time.time()
    html_cleared = re.sub(r'</?i>', '', html)
    html_cleared2 = re.sub(r'<br\s*/?>', ';', html_cleared)
    tree = lhtml.fromstring(html_cleared2)
    for i in range(1,rows_per_page+1,1):
        main_dir = f'//*[@id="_dissclinventory_WAR_dissclinventoryportlet' \
                   f'_ocerSearchContainerSearchContainer"]/table/tbody/tr[{i}]'
        name = tree.xpath(f'{main_dir}/td[1]/a/text()')[0]
        ec_no = tree.xpath(f'{main_dir}/td[2]/text()')[0]
        cas_no = tree.xpath(f'{main_dir}/td[3]/text()')[0]
        cl_class = ';'.join(tree.xpath(f'{main_dir}/td[4]/div/div[1]/*/span/text()'))
        sourse = tree.xpath(f'{main_dir}/td[5]/text()')[0]
        cl_url = tree.xpath(f'{main_dir}/td[6]/a/@href')[0]

        index = num_page * rows_per_page - rows_per_page + i

        df.at[index,'cl_id'] = cl_url.replace('https://echa.europa.eu/information-on-'
                                            'chemicals/cl-inventory-database/-/discli/details/','')
        df.at[index,'name'] = re.sub(r'(^\s|\s$)','', name)
        df.at[index,'EC_No'] = re.sub(r'(^\s|\s$)','', ec_no)
        df.at[index,'CAS_No'] = re.sub(r'(^\s|\s$)','', cas_no)
        df.at[index,'cl_classification'] = re.sub(r'(^\s|\s$)','', cl_class)
        df.at[index,'sourse'] = re.sub(r'(^\s|\s$)','', sourse)
    print('Parsing time: {:.1f}'.format(time.time() - start))

def get_index(pages_num:int, start_from_page:int, rows_per_page:int):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    for i in range(start_from_page, pages_num+1, 1):
        print('Parsing page №', i, 'from', pages_num)
        html = get_html(page=i, rows_per_page=rows_per_page)
        if html.status_code == 200:
            parse_index_catalogue(html=html.text, num_page=i , rows_per_page=rows_per_page)
            save_csv(df=df, dir=index_url)
        else:
            print('Page loading error')
        print('_'*30)

def parse_content(html):
    '''Parse the safetyscan content of pages'''
    soup = BeautifulSoup(html, 'html.parser')
    tables = soup.find_all('table', class_=re.compile(r'CLP[Tt]able taglib-safetyscan-iterator'))
    if len(tables) == 0: return 'No data', 0
    index = 0 if len(tables) == 1 else 1
    all_tr = tables[index].find_all('tr', class_=re.compile(r'(results-row|results-row-alt)'))
    if len(all_tr) == 0: return 'No data', 0
    # Находим индексы всех tr элементов с которых начинается каждый блок таблицы
    start_from_tr = []
    for i, tr in enumerate(all_tr):
        if len(tr) == 25:
            start_from_tr.append(i)
    start_from_tr.append(len(all_tr))

    # вычисляем индексы строк которые находятся в отдельных блоках таблицы
    intervals = []

    if len(all_tr[0]) == 25:
        for i in range(len(start_from_tr)-1):
            intervals.append((start_from_tr[i], start_from_tr[i+1]-1))

    if len(all_tr[0]) == 15:
        intervals.append((0,(len(all_tr)-1)))

    ghs_notifiers_num = []
    all_notifiers = 0
    # парсим каждый интервал tr-ов
    for start, end in intervals:
        ghs_codes = []
        num_notifiers = 0
        for i in range(start, end+1):
            if len(all_tr[i]) == 25:
                # парсим GHS коды и количество респондентов
                all_td = all_tr[i].find_all('td')
                num_notifiers = int(all_td[9].get_text())
                ghs1 = re.findall(r'H\d{3}',all_td[1].get_text())
                ghs2 = re.findall(r'H\d{3}',all_td[2].get_text())

                if len(ghs1) == 0 and len(ghs2) == 0:
                    ghs_codes.append('Not classified')
                else:
                    ghs_codes.extend(ghs1)
                    ghs_codes.extend(ghs2)
            if len(all_tr[i]) == 7 or len(all_tr[i]) == 15:
                # парсим GHS коды
                all_td = all_tr[i].find_all('td')
                ghs1 = re.findall(r'H\d{3}', all_td[1].get_text())
                ghs2 = re.findall(r'H\d{3}', all_td[2].get_text())
                if len(ghs1) == 0 and len(ghs2) == 0:
                    ghs_codes.append('Not classified')
                else:
                    ghs_codes.extend(ghs1)
                    ghs_codes.extend(ghs2)
        ghs_codes = list(set(ghs_codes))
        all_notifiers += num_notifiers
        for ghs_code in ghs_codes:
            ghs_notifiers_num.append((ghs_code,num_notifiers))
    ghs_string = merge_tuples(ghs_notifiers_num)
    return ghs_string, str(all_notifiers)

def merge_tuples(data:list):
    # суммируем все значения по ключу
    sums = collections.defaultdict(int)
    for k, i in data:
        sums[k] += i
    strings_ghs = []
    # объединяем кортежи в строки с разделителем ':'
    for i in sums.items():
        strings_ghs.append(':'.join((i[0], str(i[1]))))
    # объединяем список строк в одну строку с разделителем ';'
    ghs_string = ';'.join(map(str, strings_ghs))
    return ghs_string

def get_data(dir):
    '''The module iterates over the list of url links imported from
    CSV and parses the data for each link. Auto save parameter can be configured,
    for example after every n + 10 iterations'''
    df = read_csv(dir)
    start, stop = 2400, len(df)-1
    df['ghs_and_notifiers'] = df['ghs_and_notifiers'].astype('str')
    df['num_of_notifiers'] = df['num_of_notifiers'].astype('str')
    for index, row in df[start:stop+1].iterrows():
        print(f'File: {dir}')
        print(f'Index: {index} from {len(df)}')
        cl_id = row['cl_id']
        print('CL id:', cl_id)
        html = get_html(page=cl_id)
        if html.status_code == 200:
            ghs_string, all_notifiers = parse_content(html=html.text)
            #print(f'GHS codes:{ghs_string}, Notifiers {all_notifiers}')
            df.at[index, 'ghs_and_notifiers'] = ghs_string
            df.at[index, 'num_of_notifiers'] = all_notifiers

            if index % 100 == 0:
                print('\n backup')
                save_csv(df=df, dir=dir)
            elif index == stop:
                print('\n Parsing completed')
                save_csv(df=df, dir=dir)
        else:
            print('Page №:', index, ' \n Page not available, save current result \n', )
            save_csv(df=df, dir=dir)
        print('_'*20)

def read_csv(dir):
    '''Open the downloaded csv of index links'''
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df

def save_csv(df, dir):
    '''Save csv. The type parameter switches the writing method for
    the correct writing of the python-list with one dimension or
     two dimensions to the csv file.'''
    df.to_csv(dir, index = False, encoding='utf-8')

#index_url = '../db/cl_inventory_index.csv'
#df = read_csv(index_url)
#get_index(pages_num=930, start_from_page=930, rows_per_page=200) # rows_per_page: 50, 100, 200

def url_generator(list:list):
    dirs = []
    for num in list:
        dirs.append(f'../db/cl_inventory_part1/{num}cl_inventory_index.csv')
    return dirs

tuples = ((66,40,28),)
def main():
    """Запускаем несколько потоков"""
    for tuple in tuples:
        dir_list = url_generator(tuple)
        with Pool(processes=3) as pool:
            pool.map(get_data, dir_list)

#if __name__ == '__main__':
#    safetyscan()

get_data('../db/cl_inventory_part1/26cl_inventory_index.csv')