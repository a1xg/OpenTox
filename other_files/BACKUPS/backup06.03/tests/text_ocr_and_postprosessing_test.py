from image_to_text.text_postprocessing import TextPostprocessing
from image_to_text.text_ocr import TextOCR
from langprofile.lang import LangProfile
import time
import cv2
import os
import glob
import numpy as np
import re
import pandas as pd
import csv
from itertools import zip_longest

def filenameEncoder(dir):
    '''Считывает из имени файла его номер и язык изображения'''
    filename = os.path.basename(dir)
    name = os.path.splitext(filename)[0]
    lang = filename[0:3]
    number = re.findall(r'[0-9]{1,5}', name)[0]

    return (lang, number)

def validation(result_list, key):
    '''Валидация распознанного текста'''
    right_answers = validation_dict[key]
    cross = list(set(right_answers) & set(result_list))
    accuracy = len(cross)*100/len(validation_dict[key])
    return accuracy

def read_csv(dir):
    '''Открываем CSV файл и считываем данные по каждой колонке, фильтруем nan'''
    df = pd.read_csv(dir, encoding='utf-8', delimiter=';', header=0)
    headers = list(df.columns.values)
    dict = {}
    for header in headers:
        column = df[header].values.tolist()
        dict[header] = [x for x in column if str(x) != 'nan']

    return dict

def write_csv(dict):
    '''
    Принимает словарь списков вида {'a':['a','b','c'], 'b':['c','d','e']}
    Сохраняет каждый список в таблицу, у которой заголовком колонки является ключ,
    а колонка - все элементы списка
    :param dict:
    :return:
    '''
    with open('images_crop/csv/test.csv', "w", newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(dict.keys())
        writer.writerows(zip_longest(*dict.values()))

# Общий тест объединяющий распознавание и постпроцессинг

file_dir = glob.glob('../images_full/*.jpg')
file_dir.sort()
validation_dict = read_csv(dir='../images_crop/csv/right_answers.csv')

all_words = []
all_enum = []
all_long_strings = []
all_accuracy = []
all_time = []
for dir in file_dir:
    img = cv2.imread(dir)
    img_lang, img_num = filenameEncoder(dir)
    print('Language:', img_lang, '\nImage num', img_num)

    start = time.time()
    """
    # тест пока отключен, поскольку сам LangProfile() еще на начальной стадии разработки
    # язык определенный по умолчанию(geoIP)
    langs = LangProfile()
    # Если пользователь указал язык текста картинки, то распознавание не нужно,
    # иначе используем язык его геолокации и определяем язык картинки
    language = langs.img if bool(langs.img) == True else langs.geoIP # supposed_lang
    detect = False if bool(langs.img) == True else True  # lang_detect (bool)
    """
    ocr = TextOCR(img) # create object OCR
    ocr.getText(text_lang=img_lang, lang_detect=0, crop=1, set_font=40)
    print('FINDED TEXT:\n', ocr.text)
    for dict in ocr.text:
        language, text = list(dict.items())[0]
        filter = TextPostprocessing(language, text)
        print('\nCleared text:\n', filter.wordlist, '\nE chemicals:\n', filter.enums)
        #all_text_dict[img_lang + '-' + img_num] = filter.wordlist[:]
        #accuracy = validation(filter.wordlist, key=(img_lang + '-' + img_num))
        #all_accuracy.append(accuracy) if accuracy > 0 else None
        #print('LANGUAGE:', ocr.lang, 'ACCURACY (%): ', accuracy)


    end = time.time()
    print("[Recog&Postprocessing] Затрачено [{:.6f}] секунд".format(end - start))
    all_time.append(end - start)
    print('-'*150)

#write_csv(all_text_dict)
#print('Mean accuracy(%):', np.array(all_accuracy).mean())
mean_time = np.mean(all_time)
print("\n[All Dataset] Mean recognize time [{:.6f}] sec".format(mean_time))
#print(f'Words total: {len(all_words)}, Long string total: {len(all_long_strings)}')

# Reconition and postprosessing statistics:
# imgsize 1000 45 sec, Words total: 615, Enums total: 15, Long string total: 52
# Imgsize 2048 49 sec, Words total: 669, Enums total: 18, Long string total: 56
# Imgsize 4000 67 sec, Words total: 578, Enums total: 17, Long string total: 54
# after modification of OCR module:
# Imgsize 1024 31 sec, Words total: 810, Long string total: 60, accuracy 56%
# 10-20 строк норм
# 35 сливается

# распознавание с обнаружением языка и с кропом в среднем 7 сек
# распознавание без обнаружения и без кропа 1.3 сек
