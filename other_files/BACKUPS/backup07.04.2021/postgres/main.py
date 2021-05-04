import psycopg2
from psycopg2.extras import DictCursor
import time
import json
import re
import pandas as pd
import numpy as np
import requests
import urllib
num_patterns = {'colour_index':r'([Cc]\.?[Ii]\.?\s?\d{5})',
            'CAS_No':r'(\d{2,6}-\d{2}-\d{1})',
            'EC_No':r'(\d{3}-\d{3}-\d{1})',
            'e_number':r'(E\d{3}[\d\w]|E\d{3})',
            'GHS_codes':r'H\d{3}',
            'inchikey':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }

# TODO удалить дубли

def connect_db():
    con = psycopg2.connect(
        database="ingredients_db",
        user="database_api",
        password="90053366MOON",
        host="127.0.0.1",
        port="5432"
    )
    return con

start = time.time()
con = connect_db()
cur = con.cursor(cursor_factory=DictCursor)
#cur.execute("SELECT ingredients.safety_id, data FROM ingredients LEFT JOIN safety ON ingredients.safety_id = safety.id;")
#r = cur.fetchall()
#print(r)

def set_relations():
    cur.execute("""SELECT * FROM ingredients;""") #
    rows = cur.fetchall()
    for row in rows:
        print(f'id {row[0]}, data {row[1]}')
        ingredients_id = row[0]
        # Создаем связь по CAS
        if bool(set(['casNumbers']) & set(row[1].keys())):
            cas_nums = row[1]['casNumbers']
            for cas in cas_nums:
                cur.execute("select (id) from safety where cas_number='{}'".format(cas))
                safety_id = cur.fetchone()
                if safety_id != None:
                    s_id = safety_id[0]
                    cur.execute(f"update ingredients set safety_id = {s_id} where id={ingredients_id};")
                    con.commit()
        # создаем связь по EC Num
        if bool(set(['ecNumbers']) & set(row[1].keys())):
            ec_nums = row[1]['ecNumbers']
            for ec_num in ec_nums:
                cur.execute("select (id) from safety where ec_number='{}'".format(ec_num))
                safety_id = cur.fetchone()
                if safety_id != None:
                    s_id = safety_id[0]
                    cur.execute(f"update ingredients set safety_id = {s_id} where id={ingredients_id};")
                    con.commit()
        # создаем связь по одному из названий
        if bool(set(['synonyms']) & set(row[1].keys())):
            synonyms = row[1]['synonyms']['eng']
            for synonym in synonyms:
                synonym2 = re.sub(r'[\"\'`\\]', '', synonym)
                cur.execute(f"""select id from safety where substance->'substanceNames' @> $$["{synonym2}"]$$::jsonb""")
                safety_id = cur.fetchone()
                if safety_id != None:
                    cur.execute(f"update ingredients set safety_id = {safety_id[0]} where id={ingredients_id};")
                    con.commit()
        print('-'*20)
#set_relations()
def update_jsonb_from_csv(dir):
    df = pd.read_csv(dir, encoding="utf-8", header=0, sep=",")
    df['added'] = ''
    print(df)
    for index, row in df.iterrows():
        enum = row['enum'] if pd.isna(row["enum"]) == False else None
        name = row['name'].lower() if pd.isna(row["name"]) == False else None
        cas_num = row['CAS_No'] if pd.isna(row["CAS_No"]) == False else None
        ec_num = row['EC_No'] if pd.isna(row["EC_No"]) == False else None
        inchikey = row['inchikey'] if pd.isna(row["inchikey"]) == False else None
        pubchem_cid = int(row['pubchem_CID']) if pd.isna(row["pubchem_CID"]) == False else None
        sql_string = f"""select (id) from ingredients where """

        print(enum, name, cas_num, ec_num, inchikey, pubchem_cid)
        cur.execute(f"""select (id) from ingredients where 
        data->'casNumbers' @> '["{cas_num}"]'::jsonb
        or data->'ecNumbers' @> '["{ec_num}"]'::jsonb
        or data @@ '$.inchiKey == "{inchikey}"';""")
        ingredient_id = cur.fetchall()
        if len(ingredient_id) > 0:
            for id in ingredient_id:
                key = '{eNumber}'
                cur.execute(f"""UPDATE ingredients SET data = jsonb_set(data, '{key}', '"{enum}"', TRUE) WHERE id={id[0]};""")
                con.commit()
                df.at[index, 'added'] = 'added to database'
        print(index, ingredient_id)
        print('_'*20)
    df.to_csv("../db/added_enums.csv", index = False, encoding='utf-8')
        #написать запросы к полям через or where
    #cur.execute("update ingredients set data = data - 'ghsCodes' returning *;")
    #con.commit()
#update_jsonb_from_csv("../db/enums.csv")
def build_json(identifiers:tuple):
    enum, name, cas_number, ec_number, function, synonyms, inchikey, pubchem_cid, colour_index, safety_id = identifiers
    d = {}
    #if safety_id != None: d['safety_id'] = safety_id
    if enum != None: d['eNumber'] = enum
    if name != None: d['mainName'] = name
    if cas_number != None: d['casNumbers'] = cas_number
    if ec_number != None: d['ecNumbers'] = ec_number
    if function != None: d['functions'] = function
    if inchikey != None: d['inchiKey'] = inchikey
    if pubchem_cid != None: d['pubchemCID'] = pubchem_cid
    if colour_index != None: d['colourIndex'] = colour_index
    if synonyms != None:
        synonyms2 = synonyms_filter(synonyms)
        d['synonyms'] = {'eng':synonyms2}

    j = json.dumps(d)
    js = re.sub(r'\'', '', j)
    js = re.sub(r'(\s+|\\u00a0)', ' ', js)
    return js

def synonyms_filter(wordlist):
    '''Принимает список синонимов полученных с pubchem и очищает их от всяких номеров, процентов и прочего мусора'''
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
    unique_synonyms = list(set(new_wordlist))
    return  unique_synonyms

def csv_to_jsonb(dir):
    df = pd.read_csv(dir, encoding="utf-8", header=0, sep=",")
    for index, row in df.iterrows():
        enum = row["enum"]
        name = row["name"] if pd.isna(row["name"]) == False else None
        cas_number = row["CAS_No"].split(";") if pd.isna(row["CAS_No"]) == False else None
        ec_number = row["EC_No"].split(";") if pd.isna(row["EC_No"]) == False else None
        function = row["function"].lower().split(";") if pd.isna(row["function"]) == False else None
        synonyms = row["synonyms"].lower().split(";") if pd.isna(row["synonyms"]) == False else None
        inchikey = row['inchikey'] if pd.isna(row["inchikey"]) == False else None
        pubchem_cid = int(row['pubchem_CID']) if pd.isna(row["pubchem_CID"]) == False else None
        colour_index = row['colour_index'].split(";") if pd.isna(row["colour_index"]) == False else None
        safety_id = int(row["safety_id"]) if pd.isna(row["safety_id"]) == False else None
        json_data = build_json((enum, name, cas_number, ec_number, function, synonyms, inchikey, pubchem_cid, colour_index, safety_id))
        print(json_data)
        cur.execute(f"""INSERT INTO ingredients (data) VALUES ('{json_data}'::jsonb);""")
        #con.commit()
#csv_to_jsonb("../db/added_enums.csv")
def synonymsMerge():
    cur.execute("select id, main_name, data from ingredients;")
    items = cur.fetchall()

    for item in items:
        id = item[0]
        name = item[1]
        data = item[2]

        if 'synonyms' in list(data.keys()):
            data['synonyms']['eng'].append(name)
            data['synonyms']['eng'] = list(set(data['synonyms']['eng']))
        if 'synonyms' not in list(data.keys()):
            data['synonyms'] = {'eng':[name]}
        json_data = json.dumps(data)

        #    a = """UPDATE ingredients SET data = data || '["{}"]'::jsonb WHERE id = {id};"""
        cur.execute(f"""update ingredients set data = $${json_data}$$::jsonb where id={id};""")
        print(f"""update ingredients set data = $${json_data}$$::jsonb where id={id};""")
        con.commit()
#synonymsMerge()