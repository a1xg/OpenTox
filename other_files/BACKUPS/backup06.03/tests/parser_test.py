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
# datafinity хранит свои сериализованные данные в CSV в виде:
# "[{""key"":""The Visionary"",""value"":[""word,word,word""]}, {""key"":""The Visionary"",""value"":[""word,word,word""]}]"
# ast.literal_eval(string) парсит синтаксис строки и выдает сущности питона: списки, словари итд
# TODO pubchem поля:
#  PUG_REST(cid, synonym),
#  PUG_VIEW(GHS Classification, Other Identifiers(CAS))

#  Попробовать найти базу Cl inventory с классификацей для 185000 веществ
#  Примерная стратегия: перебираем вещества в CSV по названию и с pubchem
# находим CID по имени запросом PUG-REST
dir = '../db/cosing_db/new_COSING_Ingredients-Fragrance Inventory_v2_orig.csv'
num_patterns = {'colour_index':r'([Cc]\.?[Ii]\.?\s?\d{5})',
            'CAS_No':r'(\d{2,6}-\d{2}-\d{1})',
            'EC_No':r'(\d{3}-\d{3}-\d{1})',
            'enum':r'[Ee]-?\s?[\d]{3}[\d\w]|[Ee]-?[\d]{3}',
            'GHS':r'H\d{3}',
            'inchi_key':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }

def checkResult(compound, identifiers):
    match = 0
    keys = identifiers.keys()
    synonyms = ';'.join(compound.synonyms).lower()
    for key in keys:
        pattern = r'(' + '|'.join(identifiers[key]).lower() + ')'
        # TODO регулярка ломается при проверке длинных хим названий со скобками
        if re.search(pattern, synonyms):
            match += 1
    print(f'Match: {match}')

def get_data(dir):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    df = read_csv(dir)
    for index, row in df.iterrows():
        print('_'*100)
        identifiers = identifiersExtract(row)
        print(f'Identifiers: {identifiers}')
        for key in list(identifiers.keys()):
            print(f'Request {identifiers[key]}')
            compounds = pcp.get_compounds(identifiers[key], 'name')
            if len(compounds) > 0:
                compound = compounds[0]
                print(f'Compund CID: {compound.cid}')
                # TODO все работает, осталось только сделать кроссвалидацию результатов
                checkResult(compound, identifiers)
                # Отправляем повторный запрос GHS
                nums = get_xml(compound.cid, 'GHS')
                if nums.status_code == 200:
                    ghs = pubchemParser(xml=nums.text)
                else:
                    ghs = 'Not Classified'
                print(f'GHS codes: {ghs}')
                break
            if len(compounds) <= 0:
                print(f'Compound {identifiers[key]} not found')


def url_constructor(cid:int, header:str):
    headers = {'nums': 'Names+and+Identifiers',
               'GHS': 'GHS+Classification'
               }
    url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/{cid}/XML?heading={headers[header]}'
    return url

def get_xml(cid:int, header:str):
    """Web page request"""
    url = url_constructor(cid, header)
    HEADERS = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
    r = requests.get(url, headers=HEADERS, params=None)
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

def identifiersExtract(dfrow):
    keys = ('name','CAS_No','EC_No','other_names')
    identifiers = {}
    for key in keys:
        if pd.notna(dfrow[key]):
            identifiers[key] = dfrow[key].split(';')
    # TODO приоритетный ключ можно ставить вперед и извлекать нулевой ключ типа dict.keys()[0]
    #  в списках CAS номеров, где указано несколько номеров сразу - первый номер главный

    #print(f'identifiers: {identifiers}')
    return identifiers





def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df[200:]

def save_csv(dir, df):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = '{}/new_{}'.format(folder, filename)
    df.to_csv(newdir, index = False, encoding='utf-8')

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

get_data(dir)

df = read_csv(dir)
#numCleaner('CAS_No', pattern=num_patterns['CAS_No'])
#numCleaner('EC_No', pattern=num_patterns['EC_No'])
#save_csv(dir, df)
# В файлах cosmetic_ingridients_28700_category.csv и EUCOSMETICS_Decision_7664_category.csv:
# По CAS совпадений 4143
# По INCHI_name совпадений  4872
# По IUPAC совпаденйи 3019
# В файлах new_COSING_Ingredients-Fragrance Inventory_v2 и new_FoodSubstances_3972_category:
# По CAS совпадений 1400
