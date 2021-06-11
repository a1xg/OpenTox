import pandas as pd
import time


target_haz_cls = [
    'REPRODUCTIVE_TOXICITY',  # токсичность для репродуктивной системы
    'CARCINOGENICITY',  # канцерогенность
    'ACUTE_TOXICITY',  # общая токсичность
    'SKIN_CORROSION_IRRITATION',  # раздражает глаза
    'RESPIRATORY_SKIN_SENSITISERS',  # аллерген
    'ASPIRATION_TOXICITY',  # токсично при вдыхании
    'MUTAGENICITY',  # мутаген
    'EYE_DAMAGE_IRRITATION',  # раздражает глаза
    'TARGET_ORGAN_TOXICITY'  # токсичность для органов
]
na_classes = 'NO_DATA_AVAILABLE'

class HazardMeter:
    def __init__(self, results):
        self.results = results
        self.df = self.hazard_data_aggregation()

    def hazard_data_aggregation(self):
        '''
        Метод для обобщения информации предоставленной на страницых уведомлений GHS,
        а так-же для вычисления метрик риска для здоровья
        '''
        NA = 'NO_DATA_AVAILABLE'
        notifications_th = 0.05
        start = time.time()
        # итерируемся по каждому веществу в результате поиска
        for result in self.results:
            if result.get('hazard').get('hazard_ghs_set'):
                pubchem_cid, total_notif, sourse = result['pubchem_cid'], result['hazard']['total_notifications'], result['hazard']['sourse']
                print(f"Name: {result['main_name']}\nPubchem CID: {pubchem_cid}\nSourse: {sourse}\nTotal: {total_notif}")
                df = pd.DataFrame(result['hazard']['hazard_ghs_set'])
                print(f'INPUT DF:\n{df}')
                if total_notif > 0:
                    # Подсчитываем количество уведомлений по классу опасности NO_DATA_AVAILABLE
                    no_data_num_notif = df.loc[df['hazard_class'] == NA, 'number_of_notifiers'].sum()
                    # Если в df имеются классы опасности, процент уведомлений по которым больше порогового значения, то
                    # класс опасности NO_DATA_AVAILABLE можно удалить, а количество уведомлений
                    # по этому классу вычесть из общего количества уведомлений.
                    # Если по другим классам опасности количество уведомлений меньше порогового значения, то все они подлежат удалению.
                    drop_na_flag = False
                    for index, row in df.iterrows():
                        if row['hazard_class'] != NA and row['number_of_notifiers'] > total_notif * notifications_th:
                            drop_na_flag = True

                    if drop_na_flag:
                        total_notif -= no_data_num_notif
                        df = df.drop(df[df["hazard_class"] == NA].index)
                    else:
                        df = df.drop(df[df["hazard_class"] != NA].index)

                    # Группируем уведомления по классу и удаляем дублирующие уведомления, с наименьшим значением number_of_notifiers.
                    df = df.sort_values('number_of_notifiers', ascending=False)\
                        .groupby(['hazard_class'], sort=False).first().reset_index()

                    # удаляем ненужные классы опасности с очень низким number_of_notifiers
                    delete_row = df[df["number_of_notifiers"] < total_notif*notifications_th].index
                    df = df.drop(delete_row)
                elif total_notif == 0 and sourse == 'Harmonised C&L':
                    df['number_of_notifiers'] = 1
                df['percent_notifications'] = df['number_of_notifiers'] * 100 / total_notif
                df = self.get_simplified_scale(df)
                print(f'OUTPUT DF:\n{df}\nOutput TOTAL {total_notif}')
                print(f"mean hazard scale: {df['short_hazard_scale'].sum()}\n------------------------------")
        end = time.time()
        print(f'Aggregation time: {end - start}')

    def get_simplified_scale(self, df):
        '''Метод подсчитывает средневзвешенную оценку шкалы опасности по всем классам и количеству уведомлений'''
        df['short_hazard_scale'] = df['number_of_notifiers'] / df['number_of_notifiers'].sum() * df['hazard_scale_score']
        return df

