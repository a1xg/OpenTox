import pandas as pd
import re
import numpy as np
import os
import glob
num_patterns = {'colour_index':r'([Cc]\.?[Ii]\.?\s?\d{5})',
            'CAS_No':r'(\d{2,6}-\d{2}-\d{1})',
            'EC_No':r'(\d{3}-\d{3}-\d{1})',
            'e_number':r'(E\d{3}[\d\w]|E\d{3})',
            'GHS_codes':r'H\d{3}',
            'inchikey':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }

def read_csv(dir):
    df = pd.read_csv(dir, encoding='utf-8', header=0, sep=',')
    return df

def save_csv(dir, df, prefix):
    folder, filename = os.path.dirname(dir), os.path.basename(dir)
    newdir = f'{folder}/{prefix}{filename}'
    #df = df.astype(str)
    df.to_csv(newdir, index = False, encoding='utf-8', na_rep='')

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

def crossValidation(colname, dir1, dir2):
    df1 = whitespace_clean(dir1)
    df2 = whitespace_clean(dir2)
    ''' Cравнение двух файлов по одной из колонок'''
    print(f'df1[{colname}]: {df1[colname].count()} Not NaN rows / {len(df1)} Total rows')
    print(f'df2[{colname}]: {df2[colname].count()} Not NaN rows / {len(df2)} Total rows')
    df1[colname] = df1[colname].str.strip()
    df1[colname] = df1[colname].str.lower()
    items1 = df1[colname].dropna().tolist()
    df2[colname] = df2[colname].str.strip()
    df2[colname] = df2[colname].str.lower()
    items2 = df2[colname].dropna().tolist()

    result = list(set(items1) & set(items2))
    print(result)
    print(f'Match [{colname}]: {len(result)}')

def whitespace_clean(dir):
    df = read_csv(dir)
    # удаляем пробелы в начале и конце строки
    df = df.replace(r'(^\s|\s$)', '', regex=True)
    # заменяем длинные и множественные пробелы на одиночный
    df = df.replace(r'\s+', ' ', regex=True)
    return df

def delRowByCellDuplicate(dir1, dir2):
    df1 = whitespace_clean(dir1)
    df2 = whitespace_clean(dir2)
    df = pd.concat([df1, df2])
    print(f'Original DF\n{df}')
    df1 = df[(~df['CAS_No'].duplicated()) | df['CAS_No'].isna()]
    print(f'Drop CAS\n{df1}')
    #df2 = df1[(~df1['EC_No'].duplicated()) | df1['EC_No'].isna()]
    #print(f'Drop EC No\n{df1}')
    #df2['name'] = df2['name'].str.lower()
    #print(df2['name']) 25690
    df3 = df1[(~df1['name'].duplicated()) | df1['name'].isna()]
    print(f'Drop name\n{df3}')
    save_csv(dir=dir1, df=df3, prefix='drop_duplicates_')

#delRowByCellDuplicate(dir1='../db/COSING_EUCOSMETICS_Foodsubstance_pubchem_combine.csv',
 #                dir2='../db/enums.csv')

def delRowByItemArray(dir):
    df = whitespace_clean(dir)
    df = df.replace(np.nan, '', regex=True)
    df['all_keys'] =  df['name'].map(str)+';'+df['other_names'].map(str)+';'+df['CAS_No'].map(str)+';'+\
                      df['EC_No'].map(str)+';'+df['synonyms'].map(str)+df['inchikey'].map(str)
    df['all_keys'] = df['all_keys'].map(str).str.lower()
    # заменяем более чем две точки с запятой на одну точку с запятой
    df['all_keys'] = df['all_keys'].replace(r';{2,}', ';', regex=True)
    # разбиваем строку на список по символу ';'
    df['all_keys'] = df['all_keys'].map(str).str.split(';')
    # преобразуем списки в множества уникальных элементов
    df['all_keys'] = df['all_keys'].apply(set)

    for i, row1 in df.iterrows():
        for j, row2 in df.iterrows():
            sets = row1['all_keys'] & row2['all_keys']
            print(sets) if bool(sets) == True else None

#delRowByItemArray(dir='../db/pubchem_parsed_COSING_Ingredients-Fragrance Inventory_v2_orig.csv')
#del_identical(dir1='../db/pubchem_parsed_COSING_Ingredients-Fragrance Inventory_v2_orig.csv',
#               dir2='../db/EUCOSMETICS_Decision_7664_category.csv', colname='synonyms')

def df_split(dir:str):
    '''Разбивает pandas df на указанное количество датафреймов и сохраняет в CSV'''
    df = read_csv(dir)
    dataframes = np.array_split(df, 27)
    for i, df in enumerate(dataframes):
        save_csv(dir, df, prefix=i+40)

def df_join(dir:str):
    filenames = glob.glob(dir)
    #filenames.sort()
    df_array = [read_csv(dir) for dir in filenames]
    joined_df = pd.concat(df_array)
    print(joined_df)
    save_csv("../db/cl_inventory/joined_cl_inventory.csv", joined_df, prefix='')

def checkNaN(df, colname:str):
        print('Not NaN:', df[colname].count(), 'total',len(df))

def extractItemFromSet(dir):
    df = read_csv(dir)
    for i, row in df.iterrows():
        if type(row['synonyms']) != float:
            string_in = row['synonyms']
            if type(row['synonyms']) != float and type(row['other_names']) != float:
                string_in = row['synonyms'] + ';' + row['other_names']
            wordlist = string_in.split(';')
            new_wordlist = []
            for word in wordlist:
                match = re.findall(r'\d', word)
                if len(match) > 0:
                    persent_nums = len(match) * 100 / len(word)
                    if persent_nums < 30:
                        if len(re.findall(r'%', word)) == 0:
                            if len(re.findall(r'[A-Z]{14}-[A-Z]{10}-[A-Z]', word)) == 0:
                                new_wordlist.append(word)
                if len(match) == 0:
                    new_wordlist.append(word)
            unique_words = list(set(new_wordlist))
            wordstring = ';'.join(unique_words)
            df.at[i, 'synonyms'] = wordstring
    save_csv(dir, df, prefix='unique_synonyms_')

def replaceNaN(dir):
    df = read_csv(dir)
    df = df.astype(str)
    save_csv(dir=dir, df=df, prefix='new_')

replaceNaN('../db/to_import_postgres.csv')

#extractItemFromSet('../db/extract_ci_drop_duplicates_COSING_EUCOSMETICS_Foodsubstance_pubchem_combine.csv')
#  приделать Е номера
#  приделать GHS таблицу
#crossValidation('CAS_No', dir1='../db/OpenFoodToxTX22525_2020.csv', dir2='../db/cosing_db/new_COSING_Annex VI_v2.csv')
# в базах Openfoodtox и COSING_EUCOSMETICS_Foodsubstance_pubchem_combine есть 2015 пересечений по CAS
#checkNaN(df=df1,colname='GHS_codes')
#numCleaner('CAS_No', pattern=num_patterns['CAS_No'])
#numCleaner('EC_No', pattern=num_patterns['EC_No'])
#save_csv(dir, df)
