import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool
import time
import re
import numpy as np
import psycopg2
from psycopg2.extras import DictCursor
import pandas as pd
from hazard_code_estimator import HazardClassificator
#from lxml import etree, html as lhtml


all_abbrs = ['Acute Tox. 4', 'Skin Irrit. 2', 'Eye Irrit. 2A', 'STOT SE 3', 'Flam. Liq. 2', 'Skin Corr. 1B',
             'Skin Corr. 1C', 'Eye Dam. 1', 'Flam. Liq. 4', 'Eye Irrit. 2', 'Flam. Liq. 3', 'Skin Sens. 1',
             'Carc. 1B', 'Acute Tox. 3', 'Aquatic Chronic 3', 'Aquatic Chronic 2', 'Aquatic Chronic 4',
             'Acute Tox. 5', 'Water-react. 1', 'Flam. Sol. 2', 'Skin Sens. 1A', 'Aquatic Acute 1',
             'Aquatic Chronic 1', 'Eye Irrit. 2B', 'Repr. 2', 'STOT RE 2', 'Muta. 1B', 'Carc. 1A', 'Acute Tox. 2',
             'Resp. Sens. 1', 'Asp. Tox. 1', 'Skin Sens. 1B', 'Resp. Sens. 1B', 'Not Classified', 'Carc. 2',
             'Flam. Sol. 1', 'STOT RE 1', 'STOT SE 1', 'Muta. 2', 'Repr. 1B', 'STOT SE 2', 'Skin Corr. 1A',
             'Repr. 1A', 'Skin Corr. 1', 'Self-heat. 2', 'Acute Tox. 1', 'Resp. Sens. 1A', 'Org. Perox. C',
             'Water-react. 2', 'Aquatic Acute 2', 'Pyr. Sol. 1', 'Met. Corr. 1', 'Expl. 1.1', 'Flam. Liq. 1',
             'Ox. Sol. 2', 'Pyr. Liq. 1', 'Press. Gas (Comp.)', 'Aquatic Acute 3', 'Water-react. 3', 'Flam. Gas 1',
             'Press. Gas (Liq.)', 'Ox. Sol. 1', 'Ox. Gas 1', 'Ox. Sol. 3', 'Self-heat. 1', 'Ox. Liq. 2', 'Press. Gas ',
             'Unst. Expl. ', 'Lact. ', 'Ox. Liq. 1', 'Flam. Gas 2', 'Ozone 1', 'Ox. Liq. 3', 'Skin Mild Irrit. 3',
             'Muta. 1A', 'Aerosol 1', 'Asp. Tox. 2', 'Org. Perox. D', 'Self-react. E', 'Self-react. C', 'Self-react. D',
             'Self-react. A', 'Self-react. B', 'Org. Perox. B', 'Self-react. G', 'Self-react. F', 'Org. Perox. F',
             'Org. Perox. A', 'Expl. 1.4', 'Org. Perox. E', 'Org. Perox. G', 'Expl. 1.6', 'Expl. 1.5', 'Expl. 1.3',
             'Aerosol 2', 'Press. Gas (Ref. Liq.)']

def connect_db():
    con = psycopg2.connect(
        database="ingredients_db",
        user="postgres",
        password="90053366MOON",
        host="127.0.0.1",
        port="5432"
    )
    return con
con = connect_db()
cur = con.cursor(cursor_factory=DictCursor)
cur.execute(f'select cl_inventory_id from safety where hazard_data is NULL')
items = cur.fetchall()

def get_data(item_list):
    '''Модуль принимает список ID базы данных CL Inventory и итерируется по ним'''
    for item in item_list:
        cl_id = item #item[0]
        print(f'CL ID:{cl_id}')
        html = get_html(page=cl_id)
        if html.status_code == 200:
            pass
            ghs_string, total_notifications = parse_content(html=html.text)
            #print(f'GHS:{ghs_string}\nTotal notifications:{total_notifications}')
            # SAVE
        else:
            print(f'CL ID:{cl_id}\nPage not available, save current result.', )
            # SAVE
        print('_'*10)

def get_html(page, rows_per_page=None):
    """Web page request"""
    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                             ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
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
    ghs_pattern = r'(H\d{3}\w{0,2}|NA)'
    header = 'Notified classification and labelling according to CLP criteria'
    html = html[html.find(header)+1:] # Обрезаем HTML код, если в нем встретилась таблица с количеством уведомлений(CLP)
    soup = BeautifulSoup(html, 'html.parser')
    tables = soup.find_all('table', class_=re.compile(r'CLP[Tt]able taglib-search-iterator'))
    if len(tables) == 0: return 'No data', 0
    index = 0 if len(tables) == 1 else 1
    all_tr = tables[index].find_all('tr', class_=re.compile(r'(results-row|results-row-alt)'))
    if len(all_tr) == 0: return 'No data', 0
    # Находим индексы всех tr элементов/строк с которых начинается каждый блок таблицы
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
    abbrs_codes_notifications = []
    total_notifications = 0
    # перебираем интервалы tr-ов
    for start, end in intervals:

        num_notifiers = 0  # количество уведомлений для одного блока уведомлений
        # перебираем каждый из td-ов в заданном диапазоне(соответствующему 1 блоку строк) и парсим содержимое
        for i in range(start, end+1):
            all_td = all_tr[i].find_all('td')
            # парсим GHS коды и количество респондентов
            num_notifiers = int(all_td[9].get_text()) if len(all_tr[i]) == 25 else num_notifiers
            abbrs_codes_notifications.append({
                'abbr':all_td[0].get_text(),
                'ghs1':re.findall(ghs_pattern,all_td[1].get_text()),
                'ghs2':re.findall(ghs_pattern,all_td[2].get_text()),
                'notifications':num_notifiers
            })
            #  Not classified и NA это одно и тоже и называется несоответствие критериям GHS

    ghs = merge_ghs(ghs_list=abbrs_codes_notifications)
    return ghs, str(total_notifications)

def merge_ghs(ghs_list):
    new_ghs_list = []
    for ghs_dict in ghs_list:
        # удаляем "тройные" коды, которые были записаны в стиле H200+H300+H324, т.к. они дублируют уже имеющиеся в блоке
        if len(ghs_dict['ghs1']) <= 1 and len(ghs_dict['ghs2']) <= 1:
            new_dict = keys_decomposition(ghs_dict) # отделяем аббревиатуру от категории
            new_ghs_list.append(new_dict)

    # TODO написать конкатенацию словарей
    #  для GHS номеров с отсутствующей аббревиатурой и категорией нужно
    #  задать случайную категорию по такому-же ключу взятому в другом словаре
    df = pd.DataFrame(new_ghs_list)
    #print('IN\n', df)
    df = df.groupby(['abbr','category','code'], dropna=False)['notifications'].sum()
    #print('GROUP\n',df)

    return ''

def keys_decomposition(ghs_dict):
    category_pattern = r'(\s\d?\.?\w?$|\(.+\))'
    ghs_dict['abbr'] = re.sub(r'\*+', '', ghs_dict['abbr'])             # удаляем символы звездочек, если есть
    ghs_dict['abbr'] = re.sub(r'(\s+$|^\s+)', '', ghs_dict['abbr'])     # Удаляем пробелы в начале и конце строки
    ghs_dict['abbr'] = re.sub(r'\s+', ' ', ghs_dict['abbr'])            # множественные пробелы и табы заменяем на одиночный пробел
    category = re.findall(category_pattern, ghs_dict['abbr'])           # ищем категорию опасности
    ghs_dict['category'] = re.sub(r'^\s','',category[0]) if bool(category) == True else '' # если категория отсутствует, присваиваем ''
    ghs_dict['abbr'] = re.sub(category_pattern, '', ghs_dict['abbr'])   # Вырезаем категорию из аббревиатуры

    if len(ghs_dict['ghs1']) == 1:
        ghs_dict['code'] = ghs_dict['ghs1'][0]
        ghs_dict.pop('ghs1',None)

    else:
        ghs_dict.pop('ghs1', None)
    if len(ghs_dict['ghs2']) == 1:
        ghs_dict['code'] = ghs_dict['ghs2'][0]
        ghs_dict.pop('ghs2', None)
    else:
        ghs_dict.pop('ghs2', None)
    if ghs_dict['abbr'] == '':
        ghs_dict.pop('abbr', None)

    if ghs_dict['category'] == '':
        ghs_dict.pop('category', None)

    return ghs_dict

def main(threads, items):
    """Запускаем несколько потоков"""
    cl_id_lists = np.array_split(items, threads)
    with Pool(processes=threads) as pool:
        pool.map(get_data, cl_id_lists)

#if __name__ == '__main__':
#    main(threads=6, items=items)
test_id = ['98','1011','71711','124413','427','224536', '71720', '49769', '368','127390', '133116']
get_data(item_list=test_id)
