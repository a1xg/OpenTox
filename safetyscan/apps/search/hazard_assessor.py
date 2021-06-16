import pandas as pd
import time
from collections import OrderedDict

class HazardMeter:
    def __init__(self, data, display_format):
        """
        :param data: Django REST framework list
        :param display_format: 'hazard_summary' or 'hazard_detail'
        """
        self._data = data
        self._display_format = display_format # 'hazard_summary' or 'hazard_detail'
        self._NA = 'NO_DATA_AVAILABLE'
        # пороговое значение процентного количества уведомлений
        # по классу опасности, ниже которого класс опасности игнорируется в расчете
        self._notif_th = 0.05
        self._decimals = 1 # количество знаков после запятой в значениях оценок опасности.
        self.processed_data = self._ingredient_iterate()

    def _ingredient_iterate(self) -> OrderedDict:
        """
        Метод перебирает информацию о каждом ингридиенте в результатах поиска
        """
        ingredient_hazard_sums = []
        for ingredient in self._data:
            if ingredient.get('hazard').get('hazard_ghs_set'):
                df = pd.DataFrame(ingredient['hazard']['hazard_ghs_set'])
                aggregated_df = self._hazard_data_aggregate(
                    total_notif=ingredient['hazard']['total_notifications'],
                    sourse=ingredient['hazard']['sourse'],
                    df=df)
                ingredient_hazard_sum = self._ingredient_hazard_sum(df=aggregated_df)
                ingredient['hazard']['ingredient_hazard_sum'] = ingredient_hazard_sum
                ingredient_hazard_sums.append(ingredient_hazard_sum)
                # формируем наборы данных для отображения в списке результатов или для страницы каждого ингредиента
                if self._display_format == 'hazard_summary':
                    del ingredient['hazard']['hazard_ghs_set']
                elif self._display_format == 'hazard_detail':
                    ingredient['hazard']['hazard_ghs_set'] = [OrderedDict(row) for i, row in aggregated_df.iterrows()]
                #print(f'original df: {df}\naggregated df: {aggregated_df}')
        # считаем среднее значение опасности по всем ингридиентам продукта и добавляем ключ в коллекцию

        return OrderedDict(
            {
                'product_ingredients': self._data,
                'product_hazard_mean': self._product_hazard_sum(data=ingredient_hazard_sums)
            }
        )


    def _hazard_data_aggregate(self, total_notif: int, sourse: str, df: pd.DataFrame) -> pd.DataFrame:
        """
        Модуль обобщает уведомления об опасности вещества по их классу, внутри одного класса
        выбирает те, количество уведомлений по которым наибольшее.
        
        Если в df имеются классы опасности, процент уведомлений по которым больше порогового значения, то
        класс опасности NO_DATA_AVAILABLE можно удалить, а количество уведомлений по этому классу вычесть
         из общего количества уведомлений.
        Если по существующим классам опасности количество уведомлений меньше порогового значения, 
        то все они подлежат удалению, а класс NO_DATA_AVAILABLE останется единственным принятым для вещества.
        """
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
        elif total_notif == 0 and sourse == 'Harmonised C&L':
            df['number_of_notifiers'] = 1
        # по каждому из оставшихся классов опасности считаем процент уведомлений от общего числа уведомлениц
        df['percent_notifications'] = (df['number_of_notifiers'] * 100 / total_notif).__round__(self._decimals)

        return df

    def _ingredient_hazard_sum(self, df: pd.DataFrame) -> float:
        """Метод подсчитывает средневзвешенную оценку шкалы опасности по всем классам и количеству уведомлений"""
        # FIXME проверить корректность подсчета
        df['short_hazard_scale'] = (
            df['number_of_notifiers'] /
            df['number_of_notifiers'].sum() *
            df['hazard_scale_score']).__round__(self._decimals)

        return df['short_hazard_scale'].sum().__round__(self._decimals)

    def _product_hazard_sum(self, data: list) -> float:
        """Считает общую опасность продукта"""
        return (sum(data) / len(data)).__round__(self._decimals)
