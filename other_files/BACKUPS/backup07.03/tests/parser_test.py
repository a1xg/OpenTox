import time
import ast
import pubchempy as pcp
import requests
from bs4 import BeautifulSoup
import random
import re
import pandas as pd
import os
import lxml

#  Попробовать найти базу Cl inventory с классификацей для 185000 веществ
#  Примерная стратегия: перебираем вещества в CSV по названию и с pubchem
# находим CID по имени запросом PUG-REST

num_patterns = {'colour_index':r'([Cc]\.?[Ii]\.?\s?\d{5})',
            'CAS_No':r'(\d{2,6}-\d{2}-\d{1})',
            'EC_No':r'(\d{3}-\d{3}-\d{1})',
            'enum':r'[Ee]-?\s?[\d]{3}[\d\w]|[Ee]-?[\d]{3}',
            'GHS':r'H\d{3}',
            'inchi_key':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }

def checkResult(compound, identifiers:dict):
    match = 0
    keys = identifiers.keys()
    synonyms = ';'.join(compound.synonyms).lower()
    # перебираем ключи словаря результатов поиска
    for key in keys:
        # перебираем названия по ключу из списка
        for word in identifiers[key]:
            # проверяем название в списке синонимов
            if synonyms.find(word.lower()) > 0:
                match += 1
    return True if match >= 1 else False

def get_data(df, colnames:tuple, start_from:int):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    # перебираем ряды датафрейма
    for index, row in df.iterrows():
        # начинаем проверку с определенной строки, если работа скрипта была остановлена из за ошибки
        if index >= start_from:
            # извлекаем из ряда данные, по которым будем формировать запросы и проводить валидацию результатов
            identifiers = identifiersExtract(row, colnames)
            print(f'Index: {index}')
            for key in list(identifiers.keys()):
                print(f'Request compound: {identifiers[key]}')
                compounds = pcp.get_compounds(identifiers[key], 'name')
                if len(compounds) > 0:
                    compound = compounds[0]
                    check = checkResult(compound, identifiers)
                    print(f'Compund CID: {compound.cid},\nSearch result: {check}')
                    # Отправляем повторный запрос GHS
                    nums = get_xml(compound.cid, 'GHS')
                    ghs = pubchemParser(xml=nums.text) if nums.status_code == 200 else 'Not Classified'
                    # writeResult()
                    break
                if len(compounds) <= 0:
                    print(f'Compound not found.')
            else:
                for key in list(identifiers.keys()):
                    print(f'Request substance: {identifiers[key]} ')
                    substances = pcp.get_substances(identifiers[key], 'name')
                    if len(substances) > 0:
                        print(f'Substances: {substances}')
                        # writeResult()
                        break
                    else:
                        print(f'Substance not found')
            print('_' * 100)
        if index % 50 == 0:
            pass
            #writeResult()
# TODO осталось подготовить результаты к записи

def writeResult(compound, ghs):
    pass


def get_xml(cid:int, header:str):
    """Web page request"""
    page_headers = {'nums': 'Names+and+Identifiers',
               'GHS': 'GHS+Classification'
               }
    request_header = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
    url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/{cid}/XML?heading={page_headers[header]}'
    r = requests.get(url, headers=request_header, params=None)
    # Recognize the page encoding and set its value for decoding
    r.encoding = r.apparent_encoding
    # Request delay timer
    #SLEEP = random.triangular(0.01, 0.03, 0.01)
    #time.sleep(SLEEP)
    return r

def pubchemParser(xml):
    match = re.findall(num_patterns['GHS'], xml)
    if len(match) == 0:
        ghs = 'Not Classified'
    else:
        ghs = ';'.join(set(match))
    return ghs

def identifiersExtract(row, colnames:tuple):
    identifiers = {}
    for colname in colnames:
        if pd.notna(row[colname]):
            identifiers[colname] = row[colname].split(';')
    return identifiers

def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df

def save_csv(dir, df):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = '{}/new_{}'.format(folder, filename)
    df.to_csv(newdir, index = False, encoding='utf-8')

dir = '../db/new_EUCOSMETICS_Decision_7664_category.csv'
df = read_csv(dir)
colnames = ('name', 'CAS_No', 'EC_No', 'other_names')
get_data(df=df, colnames=colnames, start_from=160)

def numCleaner(colname, pattern):
    for index, row in df.iterrows():
        if pd.notna(row[colname]):
            match = re.findall(pattern, str(row[colname]))
            if bool(match) == True:
                #print(index, match)
                cleared_nums = ';'.join(match)
                #print(f'Index: {index}, Newstring: {cleared_nums}')
                df[colname][index] = cleared_nums

def replaceChar(colname,pattern, replace):
    print(df[colname])
    df[colname] = df[colname].replace(pattern, replace, regex=True)
    print(df[colname])

    #df[colname] = df[colname].replace(r'\(INN\)', '', regex=True)

def crossValidation(colname, df1, df2):
    # сравнение двух списков элементов и поиск совпадений
    df1[colname] = df1[colname].str.replace(' ', '')
    items1 = df1[colname].dropna().tolist()
    print(items1)
    df2[colname] = df2[colname].str.replace(' ', '')
    items2 = df2[colname].dropna().tolist()
    print(items2)
    result = list(set(items1) & set(items2))
    print(len(result))


#numCleaner('CAS_No', pattern=num_patterns['CAS_No'])
#numCleaner('EC_No', pattern=num_patterns['EC_No'])
#save_csv(dir, df)
# В файлах cosmetic_ingridients_28700_category.csv и EUCOSMETICS_Decision_7664_category.csv:
# По CAS совпадений 4143
# По INCHI_name совпадений  4872
# По IUPAC совпаденйи 3019
# В файлах new_COSING_Ingredients-Fragrance Inventory_v2 и new_FoodSubstances_3972_category:
# По CAS совпадений 1400
