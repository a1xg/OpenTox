import time
import ast
import pubchempy as pcp
import requests
import bs4
import random
import pandas as pd
import os
# datafinity хранит свои сериализованные данные в CSV в виде:
# "[{""key"":""The Visionary"",""value"":[""word,word,word""]}, {""key"":""The Visionary"",""value"":[""word,word,word""]}]"
# ast.literal_eval(string) парсит синтаксис строки и выдает сущности питона: списки, словари итд
# TODO pubchem поля:
#  PUG_REST(cid, synonym),
#  PUG_VIEW(GHS Classification, Other Identifiers(CAS))
#  Для PUG_REST использовать хим название, т.к. по CAS бывают ложные совпадения с другими классификаторами веществ
#  Скачать базу Colour index(CI xxxxx), 27000 веществ с CAS  (база платная)
#  База зарегистрированных в EC косметических компонентов(32000шт), по большей части дублирует уже имеющуюся на 28000 компонентов,
#  но имеются поля CI
#  Скачать базу Enums с CAS
#  Попробовать найти базу Cl inventory с классификацей для 185000 веществ
#  Примерная стратегия: перебираем вещества в CSV по названию и с pubchem
# находим CID по имени запросом PUG-REST

def url_constructor(cid:int):
    url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/substance/{}/JSON'.format(cid)
    return url

def request(url, params=None):
    """Web page request"""
    HEADERS = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
    r = requests.get(url, headers=HEADERS, params=params)
    # Recognize the page encoding and set its value for decoding
    r.encoding = r.apparent_encoding
    # Request delay timer
    #SLEEP = random.triangular(0.01, 0.03, 0.01)
    #time.sleep(SLEEP)
    return r

def get_data(name:str, param=None):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    compound = pcp.get_compounds(name, 'name')
    print(compound)
    #c = get_substances('63148-57-2', 'name', 'substance', list_return='flat')
    #print('Compound', c)
    # если вещество было найдено по имени, то возвращаем его cid номер
    if len(compound) > 0:
        cid = compound[0].cid
        url = url_constructor(cid=cid)
        json = request(url)
        if json.status_code == 200:
            print(compound[0].iupac_name)
        else:
            print('Data not found')
    else:
        print('Compound not found')

def pubchemParser(data):

    pass

def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=';')
    return df

def save_csv(dir):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = '{}/new_{}'.format(folder, filename)



# В файлах cosmetic_ingridients_28700_category.csv и EUCOSMETICS_Decision_7664_category.csv:
# По CAS совпадений 4143
# По INCHI_name совпадений  4872
# По IUPAC совпаденйи 3019