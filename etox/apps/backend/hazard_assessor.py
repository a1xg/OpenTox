import pandas as pd
from collections import OrderedDict
import json
# FIXME в detail_hazard_product не попадает класс 'NO_DATA_AVAILABLE',
#  а для большей понятности желательно его не выбрасывать
class HazardMeter:
    def __init__(self, data: list, display_format: str):
        """
        :param data: Django REST framework list
        :param display_format: 'hazard_summary' or 'hazard_detail'
        """
        self._data = json.loads(json.dumps(data))
        self._display_format = display_format
        self._NA = 'NO_DATA_AVAILABLE'
        # пороговое значение процентного количества уведомлений
        # по классу опасности, ниже которого класс опасности игнорируется в расчете
        self._notif_th = 0.1
        self._decimals = 1 # количество знаков после запятой в значениях оценок опасности.

    def get_data(self):
        # если количество ингредиентов = 1 то опасность продукта = опасности ингредиента
        all_ingredients_haz_detail, all_ingredients_haz_general = self._ingredients_hazard_filter()
        if self._display_format == 'detail':
            return self._data[0] # {'product_ingredients': self._data}
        elif self._display_format ==  'list':
            return {
                'product_ingredients': self._data,
                'product_hazard_avg': self._product_hazard_avg(data=all_ingredients_haz_general),
                'detail_hazard_product': self._product_hazard_aggregate(dataframes=all_ingredients_haz_detail)
            }

    def _ingredients_hazard_filter(self) -> list:
        """
        Метод перебирает информацию о каждом ингридиенте в результатах поиска
        """
        all_hazard_detail = []
        all_general_hazard = []
        for ingredient in self._data:
            if ingredient.get('hazard').get('hazard_ghs_set'):
                aggregated_df = self._ingredient_hazard_aggregate(
                    total_notif=ingredient['hazard']['total_notifications'],
                    sourse=ingredient['hazard']['sourse'],
                    data=ingredient['hazard']['hazard_ghs_set'])
                all_hazard_detail.append(aggregated_df)
                general_hazard = self._ingredient_hazard_avg(data=aggregated_df)
                all_general_hazard.append(general_hazard)
                ingredient['hazard']['ingredient_hazard_avg'] = general_hazard
                # формируем наборы данных для отображения в списке результатов или для страницы каждого ингредиента
                ingredient['hazard']['hazard_ghs_set'] = aggregated_df.to_dict('records')
                #if self._display_format == 'list':
                #    del ingredient['hazard']['hazard_ghs_set']
                #elif self._display_format == 'detail':
                #    ingredient['hazard']['hazard_ghs_set'] = aggregated_df.to_dict('records')
            else:
                ingredient['hazard']['ingredient_hazard_avg'] = None
        return all_hazard_detail, all_general_hazard

    def _ingredient_hazard_aggregate(self, total_notif: int, sourse: str, data: list) -> pd.DataFrame:
        """
        Модуль обобщает уведомления об опасности вещества по их классу, внутри одного класса
        выбирает те, количество уведомлений по которым наибольшее.
        
        Если в df имеются классы опасности, процент уведомлений по которым больше порогового значения, то
        класс опасности NO_DATA_AVAILABLE можно удалить, а количество уведомлений по этому классу вычесть
         из общего количества уведомлений.
        Если по существующим классам опасности количество уведомлений меньше порогового значения, 
        то все они подлежат удалению, а класс NO_DATA_AVAILABLE останется единственным принятым для вещества.
        """
        df = pd.DataFrame(data)

        if total_notif > 0:
            # Подсчитываем количество уведомлений по классу опасности NO_DATA_AVAILABLE
            na_num_notifications = df.loc[df['hazard_class'] == self._NA, 'number_of_notifiers'].sum()
            drop_na_flag = False
            for index, row in df.iterrows():
                if row['hazard_class'] != self._NA and row['number_of_notifiers'] > total_notif * self._notif_th:
                    drop_na_flag = True
                    break
            if drop_na_flag:
                total_notif -= na_num_notifications
                df = df.drop(df[df["hazard_class"] == self._NA].index)
            else:
                df = df.drop(df[df["hazard_class"] != self._NA].index)

            # Группируем уведомления по классу опасности и сохраняем уведомления с наибольшим
            # значением number_of_notifiers, дублирующие уведомления удаляем.
            df = df.sort_values('number_of_notifiers', ascending=False) \
                .groupby(['hazard_class'], sort=False).first().reset_index()
            # удаляем ненужные классы опасности с процентным значением number_of_notifiers ниже порога self._notif_th
            df = df.drop(df[df["number_of_notifiers"] < total_notif * self._notif_th].index)
        # Если источник оценки вещества Harmonised C&L, то количество уведомлений не указывается,
        # но для корректности работы мат модели изменяем 0 на единицу
        elif total_notif == 0 and sourse == 'Harmonised C&L' or bool(sourse) == False:
            df['number_of_notifiers'], total_notif = 1, 1
        # по каждому из оставшихся классов опасности считаем процент уведомлений от общего числа уведомлениц
        df['percent_notifications'] = (df['number_of_notifiers'] * 100 / total_notif).__round__(self._decimals)
        df['percent_notifications'] = df['percent_notifications'].astype(int)
        return df

    def _ingredient_hazard_avg(self, data: pd.DataFrame) -> float:
        """Метод подсчитывает взвешенную среднюю арифметическую оценку шкалы опасности по всем классам и количеству уведомлений"""
        weighted_score_list = list(
            data['number_of_notifiers'] / data['number_of_notifiers'].sum() * data['hazard_scale_score'])
        general_hazard = sum(weighted_score_list).__round__(self._decimals)
        return general_hazard

    def _product_hazard_aggregate(self, dataframes: list) -> list:
        '''Метод подсчитывает опасность продукта по нескольким классам опасности на основе его ингридиентов'''
        if dataframes:
            df = pd.concat(dataframes, ignore_index=True) # объединяем данные об опасности всех ингредиентов
            df.drop(['ghs_code', 'confirmed_status','number_of_notifiers','percent_notifications'], axis=1, inplace=True)
            df = df[df.hazard_class != self._NA]
            same_classes = df.groupby(['hazard_class']) # группируем одинаковые классы опасности
        else:
            return []

        hazard_summary = []
        for hazard_class in same_classes.groups.keys():
            class_group = same_classes.get_group(hazard_class)
            num_of_ingredients = len(class_group) # количество ингредиентов имеющих класс опасности
            # ищем величину шкалы опасности в рамках класса с максимальным количеством вхождений
            most_common_hazard_score = class_group['hazard_scale_score'].value_counts().index[0]
            # оставляем в датайрейме только те данные, у которых величина шкалы опасности совпадает
            class_group = class_group.loc[class_group['hazard_scale_score'] == most_common_hazard_score].reset_index()
            # извлекаем из датафрейма данные по самой часто встречающейся величине шкалы опасности
            data_to_display = class_group.set_index('index').iloc[0].to_dict()
            data_to_display['num_of_ingredients'] = num_of_ingredients
            hazard_summary.append(data_to_display)

        return hazard_summary

    def _product_hazard_avg(self, data: list) -> float:
        """Считает общую опасность продукта по классам опасности его ингридиентов и возвращает единую метрику опасности"""
        if data:
            return (sum(data) / len(data)).__round__(self._decimals)
        else:
            return 0