import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool
import time
import re
import json
import urllib
import numpy as np
import psycopg2
from psycopg2.extras import DictCursor
import pandas as pd
#from lxml import etree, html as lhtml
from parsing.hazard_code_estimator import HazardClassificator


classificator = HazardClassificator()
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
not_available_pass = r'No available Data or an internal error has occured\. Please contact ECHA support\.'
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
cur.execute(f"select cl_inventory_id, hazard_class_and_categories, sourse, id from safety where "
            f"hazard_data is NULL;") #
items = cur.fetchall()
queue = len(items)
percent_complete = (185845 - queue) * 100 / 185845
print(f'Complete: {percent_complete}%')  # было 185845
print(f'Остаток: {queue}')
def get_data(item_list):
    '''Модуль принимает список ID базы данных CL Inventory и итерируется по ним'''

    for item in item_list:
        cl_id = item[0]
        haz_abbr_cat = item[1]['hazardClassAndCategory']  # аббревиатура и категория, утвержденные
        sourse = item[2]
        id = item[3]
        print(f'CL ID: [{cl_id}] safety ID: [{id}]')
        html = get_html(page=cl_id)
        if html.status_code == 200:
            ghs_dicts, total_notifications = parse_content(html=html.text)
            print(ghs_dicts)
            if ghs_dicts != 0:
                ghs_modified = merge_ghs_lines(ghs_list=ghs_dicts)
                ghs_accepted = accept_ghs(control_dict=haz_abbr_cat, not_checked_dict=ghs_modified)
                # перед записью проверяем отсутствие NaN
                ghs_with_sourse_notifiers = {
                    'hazardData': ghs_accepted,
                    'sourse': sourse,
                    'totalNotification': total_notifications
                }
                json_obj = json.dumps(ghs_with_sourse_notifiers)
                cur.execute(f"""UPDATE safety SET hazard_data='{json_obj}' where cl_inventory_id={cl_id}""")
                con.commit()
            elif total_notifications == not_available_pass:
                print(f'CL ID:{cl_id} {not_available_pass}')
                # удаляем ID несуществующих страниц
                cur.execute(f"""DELETE FROM safety WHERE cl_inventory_id={cl_id};""")
                con.commit()
        else:
            print(f'CL ID:{cl_id} 404 Page not available.')
        print('_'*30)

def accept_ghs(control_dict, not_checked_dict):
    '''Сравниваем аббревиатуру и категорию из карточки вещества и из индекса(утвержденные CL Inventory)'''
    if bool(control_dict) == True:
        for dict1 in not_checked_dict:
            for dict2 in control_dict:
                if dict1['hazardAbbreviation'] == dict2['class'] and dict1['hazardCategory'] == dict2['category']:
                    dict1['confirmedStatus'] = True

        for dict in not_checked_dict:
            if bool(dict.get('confirmedStatus')) == False:
                dict['confirmedStatus'] = False
    else:
        for dict in not_checked_dict:
            dict['confirmedStatus'] = False
    return not_checked_dict

def get_html(page, rows_per_page=None):
    """Web page request"""

    proxies = {
        'http':'http://185.97.122.226:53281',
        'https':'https://185.97.122.226:53281',
    }
    headers = {'user-agent': 'Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI) AppleWebKit/537.36'
                             ' (KHTML, like Gecko) Silk/80.5.3 like Chrome/80.0.3987.162 Safari/537.36', 'accept': '*/*'}
    url = f'https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/{page}'
    r = requests.get(url, headers=headers, params=None, timeout=200)
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
    if len(re.findall(not_available_pass, html)) == 1:
        return 0, not_available_pass
    header = 'Notified classification and labelling according to CLP criteria'
    html = html[html.find(header)+1:]

    soup = BeautifulSoup(html, 'html.parser')
    tables = soup.find_all('table', class_=re.compile(r'CLP[Tt]able taglib-search-iterator'))
    if len(tables) == 0: return 0, 0 # Если на странице не найдена таблица, значит страницы вещества не существует
    index = 0 if len(tables) == 1 else 1
    all_tr = tables[index].find_all('tr', class_=re.compile(r'(results-row|results-row-alt)'))
    if len(all_tr) == 0: return 0, 0
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
        total_notifications += num_notifiers
    return abbrs_codes_notifications, total_notifications

def merge_ghs_lines(ghs_list):
    new_ghs_list = []
    for ghs_dict in ghs_list:
        print('ghs dict', ghs_dict)
        # удаляем "тройные" коды, которые были записаны в стиле H200+H300+H324, т.к. они дублируют уже имеющиеся в блоке
        if len(ghs_dict.get('ghs1')) <= 1 and len(ghs_dict.get('ghs2')) <= 1:
            new_dict = keys_decomposition(ghs_dict) # отделяем аббревиатуру от категории
            new_ghs_list.append(new_dict)
        else:
            if len(set(ghs_dict.get('ghs1'))) <= 1 and len(set(ghs_dict.get('ghs2'))) <= 1:
                new_dict = keys_decomposition(ghs_dict)  # отделяем аббревиатуру от категории
                new_ghs_list.append(new_dict)
            if len(set(ghs_dict['ghs1']) & set(ghs_dict['ghs2'])) == 1 or len(set(ghs_dict['ghs1']) & set(ghs_dict['ghs2'])) == 2:
                ghs_dict['ghs1'] = list(set(ghs_dict['ghs1']) & set(ghs_dict['ghs2']))[0]
                new_dict = new_dict = keys_decomposition(ghs_dict)  # отделяем аббревиатуру от категории
                new_ghs_list.append(new_dict)

    df = pd.DataFrame(new_ghs_list)
    print(df)
    df = keys_finding_missing_values(df)

    df = df.groupby(['abbr','category','code'], dropna=False)['notifications'].sum()

    hazard_dicts = []
    for row in df.iteritems():
        hazard_dicts.append({
            'hazardAbbreviation': row[0][0],
            'hazardCategory': row[0][1],
            'numberOfNotifiers': row[1],
            'code': row[0][2],
        })

    return hazard_dicts

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
    else:
        if len(ghs_dict['ghs2']) == 1:
            ghs_dict['code'] = ghs_dict['ghs2'][0]
        else:
            if len(ghs_dict['ghs1']) > 1:
                ghs_dict['code'] = ghs_dict['ghs1'][0]
            else:
                if len(ghs_dict['ghs2']) > 1:
                    ghs_dict['code'] = ghs_dict['ghs2'][0]

    ghs_dict.pop('ghs1', None)
    ghs_dict.pop('ghs2', None)

    # Заполняем отсутствующие значения
    if ghs_dict.get('abbr') == 'Not Classified':
        ghs_dict['code'] = 'Not Classified'
        ghs_dict['category'] = ""

    if ghs_dict.get('code') == 'NA':
        ghs_dict['abbr'] = 'Not Available'
        ghs_dict['category'] = ""

    return ghs_dict

def keys_finding_missing_values(df):
    for index1, row1 in df.iterrows():
        if row1['abbr'] == "" and row1['category'] == "":
            for index2, row2 in df.iterrows():
                if row2['code'] == row1['code'] and row2['abbr'] != "" and row2['category'] != "":
                    df.at[index1,'abbr'] = row2['abbr']
                    df.at[index1, 'category'] = row2['category']
        # Если вдруг аббревиатура и категория не были найдены в датафрейме, то находим их с помощью внешнего классификатора
        if row1['abbr'] == "" and row1['category'] == "" and row1['code'] != "":
            df.at[index1,'abbr'], df.at[index1, 'category'] = classificator.abbreviature_category_by_code(h_code=row1['code'])

        if row1['code'] == "" and row1['abbr'] != "":
            df.at[index1, 'code'] = classificator.code_by_abbreviature_category(abbreviature=row1['abbr'], category=row1['category'])

    return df

def main(threads, items):
    """Запускаем несколько потоков"""
    cl_id_lists = np.array_split(items, threads)
    with Pool(processes=threads) as pool:
        pool.map(get_data, cl_id_lists)

if __name__ == '__main__':
    main(threads=6, items=items)
#get_data(item_list=items)
