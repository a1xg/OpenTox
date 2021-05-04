from database_api.db_api import Database_API

test_data = [{'eng':
                'E928,E574,E209,E249,E321,E959,E1502,E231,E127,E326,E236,E221,E261,E327,E383,E389,E297,E510,E550,E306,E525,E311,E381,E121,E513,E170,E968,E200,E242,E285,E530,E472,E218,E309,E325,E355,E1519,E477,E310,E106,E575,E420,E342,E529,E122,E171,E152,E173,E175,E339,E404,E930,E202,E210,E701,E240,E164,E926,E233,E339,E320,E160e,E162,E163,E172,E349,E370,E387,E392,E399,E174,E425,E473,E474,E479b,E537,E497,E556,E555,E543,E628,E1520,E706,E910,E911,E517,E957,E559,E1421,E1102,E1103,E1104,E1405,E949,E917,E459,E390,E551,E480,E572,E940,E154,E161i,E150a,E150b,E150d,E153,E161a,E160a,E161c,E161f,E955,E174,E266,E227,E226,E352,E351,E181,E232,E314,E318,E322,E323,E344,E353,E384,E302,E356,E368,E406,E407a,E408,E409,E405,E426,E463,E410,E411,E413,E414,E415,E416,E417,E418,E419,E434,E429,E427,E436,E441,E442,E443,E445,E452,E465,E467,E469,E470a,E472a,E472d,E472e,E472f,E472g,E478,E483,E486,E488,E489,E498,E499,E476,E485,E562,E545,E561,E563,E558,E598,E554,E560,E565,E566,E570,E629,E632,E633,E634,E624,E625,E707,E704,E712,E710,E715,E912,E901,E903,E905,E905,E905c,E905,E906,E907,E908,E909,E915,E918,E717,E929,E956,E960,E962,E953,E969,E999,E1001,E1401,E1402,E1403,E1404,E1410,E1100,E1105,E1411,E1412,E1413,E1420,E1422,E1414,E1423,E1430,E1440,E1441,E1503,E1442,E1443,E1450,E1451,E1452,E1501,E1521,E421,E238,E160b,E173,E357,E552,E435,E359,E536,E1505,E538,E703,E716,E1101,E126,E487,E386,E101,E104,E363,E133,E217,E270,E301,E312,E420,E495,E921,E1400,E127,E431,E431,E151,E265,E304,E496,E518,E519,E527,E550,E585,E635,E637,E1504,E551,E620,E160d,E107,E705,E296,E385,E702,E708,E711,E182E952,E1525,E143,E943b,E215,E239,E160e,E101a,E444,E714,E424,E155,E161e,E464,E431,E515,E211,E281,E317,E599,E313,E508,E551,E551,E350,E540,E493,E484,E557,E152,E1000,E580,E505,E939,E402,E950,E522,E337,E446,E941,E110,E967,E263,E282,E491,E290,E180,E521,E152,E539,E1502,E329,E586,E100,E127,E128,E535,E927b,E375,E252,E713,E524,E334,E451,E345,E572,E948,E391,E1203,E475,E332,E280,E623,E250,E251,E481,E512,E900,E161h,E946,E945,E475,E366,E650,E105,E230,E324,E577,E958,E228,E919,E365,E220,E514,E1518,E925,E541,E331,E523,E579,E161j,E559,E354,E516,E141,E966,E913,E459,E284,E431,E924,E520,E328,E129,E214,E130,E333,E481,E338,E922,E102,E500,E636,E494,E380,E509,E526,E1202,E916,E551,E503,E951,E222,E1516,E403,E621,E102,E319,E161b,E170,E224,E300,E132,E440,E2,E461,E507,E904,E103,E103,E954,E120,E1200,E1202,E1510,E161d,E152,E201,E160f,E216,E212,E213,E225,E234,E237,E260,E264,E283,E303,E305,E235,E336,E335,E123,E124,E331,E367,E401,E401,E412,E407,E433,E432,E450,E468,E481,E472c,E492,E511,E553a,E553b,E578,E576,E621,E902,E914,E913,E924b,E938,E961,E965,E1517,E131,E125,E161g,E142,E203,E223,E330,E620,E262,E320,E343,E403,E920,E640,E316,E622,E627,E920,E927a,E923,E943a,E944,E111,E160c,E219,E1204,E388,E501,E544,E621,E942,E340,E462,E482,E504,E528'
                'CI 16250,CI 21010,CI 45380,CI 77820,CI 77000,CI 47005,CI 42090,CI 77288,CI 27720'
                'Aqua,Glycerin,Glyceryl Stearate,Dicaprylyl Ether,Isopropyl Myristate,Cetearyl Alcohol,Olea Europaea,Olive,Fruit Oil,Ceresin,Ceteareth-23,Dimethicone, Ceteareth-20,4 Ceteareth-12,Cetyl Palmitate,Butylene Glycol,Snail,Secretion Filtrate,Panthenol,Sodium Polyacrylate,Parfum,Sodium Hyaluronate,Methylparaben,Propylparaben,Phenoxyethanol,Ethyl Hexanediol,ALUMINUM CHLOROHYDRATE,PPG-3 BENZYL ETHER MYRISTATE,CETYL ALCOHOL,GLYCERYL STEARATE,PEG-75 STEARATE,CETETH-20,STEARETH-20,PPG-15 STEARYL ETHER,CYCLOPENTASILOXANE,DIMETHICONE CROSSPOLYMER,SYNTHETIC BEESWAX,DIMETHICONE,BEHENYL ALCOHOL,TAPIOCA STARCH,POLYMETHYLSILSESQUIOXANE,STEARYL DIMETHICONE,OCTADECENE,POLYACRYLATE CROSSPOLYMER-6,PARFUM,FRAGRANCE,PHENOXYETHANOL,METHYLPARABEN,ETHYLPARABEN,PROPYLPARABEN,ISOPROPYL MYRISTATE,TRITICUM VULGARE,WHEAT,GERM OIL,TOCOPHERYL ACETATE,BHT,PENTHYLENE GLYCOL,PEG-40 HYDROGENATED CASTOR OIL,TRIDECETH-9,BISABOLOL,ROSA DAMASCENA FLOWER EXTRACT,BUTYLPHENYL METHYLPROPIONAL,LIMONENE,METHYL 2-0CTYNOATE,Paraffinum Liquidum,Mineral Oil,Wheat,Germ Oil,Cetearyl Alcohol,Ceteareth-20,Ethylhexyl Isononanoate,Glycerin,Helianthus,Ammonium citrate,Trificum Vuigare,Tocopheryl Acetate,BHT,Parfum,Fragrance,Fucus Vesiculosus Extract,Methylparaben,Foeniculum Vulgare,Fennel,Of,Citrus Medica Limonum,Lemon,Peel Oil,Propylparaben,Capsicum Annuum,Biract,Mentha Piperita,Peppermint,Oil,Abies Sibirica,Fr,Oil,Citrus i Mirantium Bergamia,Bergamot,Oil,Citrus Paradisi,Grapefruit,Fruit Extract,pu Camellia Sinensis Leaf Edract,2-Bromo-2-Nitropropane-1,3-Diol,Sodium hydroxide,Citronellol,Geraniol,Hexyl Cinnamal,Limonene,Linalool'}]
for dict in test_data:
    test = Database_API()
    test.unpackKeywords(data=dict)
    test.getData()

"""
веществ у которых есть safety_id 8401шт
веществ у которых есть CID 7300шт
веществ у которых есть CID и safety_id 5776
есть 350 веществ с дублирующимися safety_id
запрос умеет искать части большой строки(подстроки) в реляционных полях:
SELECT (id, main_name) FROM ingredients WHERE 'propylparaben, ethylparaben' LIKE '%' || main_name || '%';
запрос умеет искать по базе частичные названия по конкретному фрагменту названия в полях jsonb:
select id,main_name from ingredients where exists(select * from jsonb_array_elements(data#>'{synonyms,eng}') where value::text like '%ylparaben%');
запрос умеет искать частичное название по фрагменту в полях jsonb:
SELECT data FROM(SELECT data, data->'synonyms'->>'eng' as syn FROM ingredients )s WHERE syn LIKE '%' || 'propylene' || '%';
Проверка статистики использования индексов SELECT * FROM pg_stat_user_indexes WHERE relname = 'ingredients';
Индекс для массива jsonb: 
CREATE INDEX eng_synonyms_data_gin_idx ON ingredients USING gin ((data#>'{synonyms,eng}'));
Индексы триграмм: 
(не работает) CREATE INDEX trgm_main_name_idx ON ingredients USING GIN (main_name gin_trgm_ops);
(работает) CREATE INDEX trgm_main_name_gist_idx ON ingredients USING GIST (main_name gist_trgm_ops);
Запрос по триграммам с выдачей всех совпадений их рейтингов: 
SELECT main_name, similarity(main_name, 'propylparaben') AS sml FROM ingredients WHERE main_name % 'propylparaben' ORDER BY sml DESC, main_name;
Запрос по триграммам с ограничением по выдаче самого вероятного совпадения:
SELECT main_name, main_name <-> 'propylene glycol' AS dist FROM ingredients ORDER BY dist LIMIT 1;
Неточный поиск через триграммы:
SELECT * FROM ingredients WHERE SIMILARITY(main_name,'ceramide-3') > 0.9;
поиск дублей: SELECT safety_id, count(*) FROM ingredients GROUP BY safety_id HAVING count(*) > 1;
select * from ingredients where data @@ '$.eNumber == "E536"';
UPDATE ingredients SET safety_id=250137 where id=31843;
left join колонок safety и ingredients
выбрать только те данные, у которых в поле jsonb содержится определенный ключ:
SELECT data FROM ingredients WHERE data->>'eNumber' IS NOT NULL;
SELECT safety_id, data, nfpa_osha_class, ghs_class FROM ingredients LEFT JOIN safety ON safety.id = ingredients.safety_id where cas_number='432-25-7';
Подсчет ненулевых значений по столбцу:
select count(*) from ingredients where "safety_id" is NOT NULL;
запрос с игнорированием раскладки
select * from names where lower(name)=lower('VaSya');
print(f'Data {rows}, \nTime {time.time()-start}')
поиск элемента в объекте с массивом:
select * from ingredients where data->'casNumbers' @> '["977157-28-0"]'::jsonb;
поиск элемента во вложенных объектах с массивом:
select * from ingredients where data->'synonyms'->'eng' @> '["Citrus Red 2, analytical standard"]'::jsonb;
поиск элемента в значениях ключа объекта:
select * from ingredients where data @@ '$.inchiKey == "GJUABKCEXOMRPQ-UHFFFAOYSA-N"';
Проверить наличие ключевого слова в массиве JSONB:
select main_name from ingredients where data @@ '$.synonyms.eng == "sodium"';
УДАЛИТЬ ключевое слово из jsonb массива:
Работает некорректно и удаляет весь jsonb
UPDATE ingredients SET data = jsonb_set(data, '{eng}', (data->'synonyms,eng') - 'sodium') WHERE data @@ '$.synonyms.eng == "sodium"';

"""


