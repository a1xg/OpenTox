import time
import ast
import pubchempy as pcp
import requests
import urllib
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
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
            'e_number':r'(E\d{3}[\d\w]|E\d{3})',
            'GHS_codes':r'H\d{3}',
            'inchi_key':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }

def checkResult(compound:pcp.Compound, identifiers:dict):
    '''Метод проверяет количество совпадений имеющихся ключевых слов с полями объекта compound'''
    keys = identifiers.keys()
    match = 0
    synonyms = ';'.join(compound.synonyms).lower()
    # перебираем ключи словаря результатов поиска
    for key in keys:
        # перебираем названия по ключу из списка
        for word in identifiers[key]:
            if match > 4: break
            # проверяем название в списке синонимов
            if fuzz.partial_ratio(word.lower(), synonyms) > 90:
                match += 1
    print(f'Match: {match}')
    return True if match >= 1 else False

def get_data(colnames:tuple, new_colnames:tuple, start_from_row:int):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    # перебираем ряды датафрейма
    for index, row in df[start_from_row:].iterrows():
        # извлекаем из ряда ключевые слова, по которым будем формировать запросы и проводить валидацию результатов
        identifiers = extractIdentifiers(row, colnames)
        print(f'Index: {index}, Identidiers: {identifiers}')
        for key in list(identifiers.keys()):
            compounds = pcp.get_compounds(identifiers[key], 'name')
            if len(compounds) > 0:
                check = checkResult(compounds[0], identifiers)
                print(f'Found compuond: {compounds}')
                ghs_data = get_xml(compounds[0].cid, 'GHS')
                ghs_codes = pubchemParser(xml=ghs_data.text) if ghs_data.status_code == 200 else 'Not Classified'
                writeResult(compounds, ghs_codes, index, new_colnames)
                break
            print(f'Compound not found.') if len(compounds) <= 0 else None
        # если среди компаундов ничего не было найдено, то пробуем найти субстанции
        else:
            for key in list(identifiers.keys()):
                print(f'Request substance {key}: {identifiers[key]}')
                substances = pcp.get_substances(identifiers[key], 'name')
                if len(substances) > 0:
                    print(f'Found substances: {substances}')
                    writeResult(substances, '', index, new_colnames)
                    break
                else:
                    print(f'Substance not found.')

        print('_' * 100)

def writeResult(pubchem_objects:list, ghs_codes:str, index:int, new_colnames:tuple):
    if index == 0:
        for colname in new_colnames:
            df[colname] = ''
    save_csv(dir, df=df, prefix='') if index % 10 == 0 else None

    if isinstance(pubchem_objects[0], pcp.Compound):
        df['GHS_codes'][index] = ghs_codes
        if 'inchi_key' in new_colnames:
            df['inchi_key'][index] = str(pubchem_objects[0].inchikey)
        if 'pubchem_CID' in new_colnames:
            df['pubchem_CID'][index] = str(pubchem_objects[0].cid)
        if 'synonyms' in new_colnames:
            synonyms = ';'.join(pubchem_objects[0].synonyms)
            synonyms = re.sub(r'\d{1,4}-[A-Z]{2}\d{7}\w\d;', '', synonyms)
            df['synonyms'][index] = synonyms
        if 'colour_index' in new_colnames:
            colour_index = re.search(num_patterns['colour_index'], synonyms)
            if bool(colour_index):
                df['colour_index'][index] = colour_index.groups()[0].replace('.', '')
        if 'e_number' in new_colnames:
            enum = re.search(num_patterns['e_number'], synonyms)
            if bool(enum):
                df['e_number'][index] = re.sub(r'[\s+:-]', '', enum.groups()[0])
        if 'CAS_No' in new_colnames:
            cas = re.search(num_patterns['CAS_No'], synonyms)
            if bool(cas):
                df['CAS_No'][index] = cas.groups()[0]
        if 'EC_No' in new_colnames:
            ec_no = re.search(num_patterns['EC_No'], synonyms)
            if bool(ec_no):
                df['EC_No'][index] = ec_no.groups()[0]
        #print(df.loc[index])

    elif isinstance(pubchem_objects[0], pcp.Substance):
        if 'pubchem_SID' in new_colnames:
            pubchem_SID = ';'.join([str(substance.sid) for substance in pubchem_objects])
            df['pubchem_SID'][index] = pubchem_SID
        #print(df.loc[index])

def get_xml(cid:int, header:str):
    """Web page request"""
    page_headers = {'nums': 'Names+and+Identifiers',
               'GHS': 'GHS+Classification'
               }
    request_header = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36'
                ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36', 'accept': '*/*'}
    url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/{cid}/XML?heading={page_headers[header]}'
    r = requests.get(url, headers=request_header, params=None, proxies=urllib.request.getproxies())
    # Recognize the page encoding and set its value for decoding
    r.encoding = r.apparent_encoding
    return r

def pubchemParser(xml):
    match = re.findall(num_patterns['GHS_codes'], xml)
    if len(match) == 0:
        ghs = 'Not Classified'
    else:
        ghs = ';'.join(set(match))
    return ghs

def extractIdentifiers(row, colnames:tuple):
    identifiers = {}
    for colname in colnames:
        if pd.notna(row[colname]):
            string = re.sub(r'(^\s+|\s+$)', '', row[colname])
            identifiers[colname] = string.split(';')
    return identifiers

def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df

def save_csv(dir, df, prefix):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = f'{folder}/{prefix}{filename}'
    df.to_csv(newdir, index = False, encoding='utf-8')

dir = '../db/parsed_FoodSubstances_3972_category.csv'
df = read_csv(dir)
new_colnames = ('inchi_key','GHS_codes', 'synonyms', 'pubchem_CID', 'pubchem_SID', 'colour_index')
colnames = ('name', 'CAS_No', 'other_names')
get_data(colnames, new_colnames, start_from_row=0)

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
