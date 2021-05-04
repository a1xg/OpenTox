import time
import pubchempy as pcp
import requests
import collections
import urllib
from bs4 import BeautifulSoup
from fuzzywuzzy import fuzz
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
            'inchikey':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }
levenshein_th = 3
freq_check_th = 2


def freqCheck(results:list, freq_thresh:int):
    '''Возвращает объект с самым часто повторяющимся id, если все объекты уникальны, то возвращает False'''
    all_id = []
    for object in results:
        if isinstance(object, pcp.Compound):
            all_id.append(object.cid)
        elif isinstance(object, pcp.Substance):
            all_id.append(object.sid)
    unique_id = collections.Counter(all_id).most_common()[0]
    for object in results:
        if isinstance(object, pcp.Compound):
            if object.cid == unique_id[0] and unique_id[1] >= freq_thresh:
                return object
            else:
                return False
        if isinstance(object, pcp.Substance):
            if object.sid == unique_id[0] and unique_id[1] >= freq_thresh:
                return object
            else:
                return False

def distLevenshtein(pubchem_obj, identifiers:dict, thresh:int):
    '''Метод проверяет количество совпадений имеющихся ключевых слов с полями объекта compound'''
    match = 0
    synonyms = ';'.join(pubchem_obj.synonyms).lower()
    keys = identifiers.keys()
    # перебираем названия по ключу из списка
    for key in keys:
        for word in identifiers[key]:
            if match >= thresh: return True
            # проверяем название в списке синонимов с помощью расстояния Левенштейна
            if fuzz.partial_ratio(word.lower(), synonyms) > 90: match += 1
    else: return False

def search(type_search:str, identifiers:dict, attempts_max:int, levenshtein_thresh:int):
    keys = identifiers.keys()
    results = []
    counter = 0
    for key in keys:
        namespace = 'inchikey' if key == 'inchikey' and type_search == 'compounds' else 'name'
        for word in identifiers[key]:
            if counter == attempts_max: return False
            if type_search == 'compounds':
                result = pcp.get_compounds(word, namespace)
            if type_search == 'substances':
                result = pcp.get_substances(word, namespace)
            # Если проверка левенштейна выявила более чем {check_thresh} сходств - обрываем выполнение цикла
            if len(result) > 0:
                results.extend(result)
                check = distLevenshtein(result[0], identifiers, levenshtein_thresh)
                print(f'Found: {result}\nLevenstein check: {check}')
                if check == True:
                    return result[0]
                else:
                    counter += 1
            else:
                counter += 1
            if len(results) >= 2:
                # Если частотная проверка выявила совпадения, то возвращаем объект
                check = freqCheck(results, freq_thresh=freq_check_th)
                print(f'Freq check {bool(check)}')
                if bool(check) != False: return check

            print(f'Chemical not found.') if len(result) <= 0 else None

def get_data(colnames:tuple, new_colnames:tuple, start:int, end:int):
    '''The method iterates over the pages of the web catalogs with links
    to the pages with the full data that needs to be parsed
    '''
    # перебираем ряды датафрейма
    for index, row in df[start:end+1].iterrows():
        if index == 0:
            for colname in new_colnames:
                df[colname] = ''
        # извлекаем из ряда ключевые слова, по которым будем формировать запросы и проводить валидацию результатов
        identifiers = extractIdentifiers(row, colnames)
        keys = identifiers.keys()
        print(f'Index: {index}, Identifiers: {identifiers}')
        for type_search in ('compounds', 'substances'):
            print(f'Type search: {type_search}')
            result = search(type_search, identifiers, attempts_max=4, levenshtein_thresh=levenshein_th)
            if bool(result) == True:
                # Если проверка не пройдена, то найти следующий компаунд
                if type_search == 'compounds':
                    ghs_data = get_xml(result.cid, 'GHS')
                    ghs_codes = pubchemParser(xml=ghs_data.text) if ghs_data.status_code == 200 else 'Not classified'
                else: ghs_codes = 'Not classified'
                print(f'Write {result}')
                writeResult(result, ghs_codes, index, new_colnames)
                break
        print('_' * 100)

def writeResult(pubchem_object:list, ghs_codes:str, index:int, new_colnames:tuple):
    save_csv(dir, df=df, prefix='') if index % 10 == 0 else None

    if isinstance(pubchem_object, pcp.Compound):
        df.at[index,'GHS_codes'] = ghs_codes
        if 'inchikey' in new_colnames:
            df.at[index,'inchikey'] = str(pubchem_object.inchikey)
        if 'pubchem_CID' in new_colnames:
            df.at[index,'pubchem_CID'] = str(pubchem_object.cid)
        if 'synonyms' in new_colnames:
            synonyms = ';'.join(pubchem_object.synonyms)
            synonyms = re.sub(r'\d{1,4}-[A-Z]{2}\d{7}\w\d;', '', synonyms)
            df.at[index,'synonyms'] = synonyms
        if 'colour_index' in new_colnames:
            colour_index = re.search(num_patterns['colour_index'], synonyms)
            if bool(colour_index):
                df.at[index,'colour_index'] = colour_index.groups()[0].replace('.', '')
        if 'e_number' in new_colnames:
            enum = re.search(num_patterns['e_number'], synonyms)
            if bool(enum):
                df.at[index,'e_number'] = re.sub(r'[\s+:-]', '', enum.groups()[0])
        if 'CAS_No' in new_colnames:
            cas = re.search(num_patterns['CAS_No'], synonyms)
            if bool(cas):
                df.at[index,'CAS_No'] = cas.groups()[0]
        if 'EC_No' in new_colnames:
            ec_no = re.search(num_patterns['EC_No'], synonyms)
            if bool(ec_no):
                df.at[index,'EC_No'] = ec_no.groups()[0]

    elif isinstance(pubchem_object, pcp.Substance):
        if 'pubchem_SID' in new_colnames:
            df.at[index,'pubchem_SID'] = pubchem_object.sid
        if 'synonyms' in new_colnames:
            synonyms = ';'.join(pubchem_object.synonyms)
            df.at[index,'synonyms'] = synonyms
    save_csv(dir, df=df, prefix='') if index == len(df)-1 else None

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
    """Извлекаем ключевые слова из выбранных колонок датафрейма"""
    identifiers = {}
    keywords = []
    # Извлекаем все строковые значения из указанных ячеек
    for colname in colnames:
        if pd.notna(row[colname]):
            keywords.append(row[colname])
    # объединяем список в строку с разделителем ';'
    keywords = ';'.join(keywords)
    # Проверяем нет ли в общей строке искомых идентификаторов
    for key in ('inchikey', 'colour_index', 'CAS_No', 'EC_No'):
        identifier = re.findall(num_patterns[key], keywords)
        if len(identifier) > 0:
            identifiers[key] = identifier

    keys = identifiers.keys()
    # удаляем из общей строки найденные идентификаторы
    for key in keys:
        words = identifiers[key]
        keywords = keywords.replace(words[0], '')

    keywords1 = re.sub(r'(^;|;$)', '', keywords)
    keywords2 = re.sub(r';{2,}', ';',keywords1)
    keywords3 = re.sub(r'(^;|;$)', '', keywords2)
    print(keywords3)
    keywords_list = keywords3.split(';')
    #keywords_list = [re.sub(r'\xa0', '', word) for word in keywords_list]

    identifiers['other_names'] = list(set(keywords_list))
    return identifiers

def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df

def save_csv(dir, df, prefix):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = f'{folder}/{prefix}{filename}'
    df.to_csv(newdir, index = False, encoding='utf-8')

dir = '../db/COSING_Ingredients_and_EUCOSMETICS_combine.csv'
df = read_csv(dir)
new_colnames = ('inchikey','GHS_codes', 'synonyms','pubchem_CID','pubchem_SID', 'colour_index', 'CAS_No','EC_No')
colnames = ('name','CAS_No','EC_No','other_names')
string = 504
#get_data(colnames, new_colnames, start=25380, end=len(df))


