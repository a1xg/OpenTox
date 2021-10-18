import pandas as pd
from collections import OrderedDict
import json

# The module filters and summarizes information about an ingredient,
# based on data from the CLP system, removing information with
# insufficient reliability.
# Based on the data obtained, several ratings are calculated for
# an ingredient and for the entire product based on these ingredients.

class HazardMeter:
    def __init__(self, data: list, display_format: str):
        """
        :param data: Django REST framework list
        :param display_format: 'hazard_summary' or 'hazard_detail'
        """
        self._data = json.loads(json.dumps(data))
        self._display_format = display_format
        self._NA = 'NO_DATA_AVAILABLE'
        # threshold value of the percentage of notifications by
        # hazard class, below which the hazard class is ignored in the calculation
        self._notif_th = 0.1
        self._decimals = 1 # number of decimal places in hazard rating values.

    def get_data(self):
        # if the number of ingredients is 1 then the hazard of the product is equal to the hazard of the ingredient
        all_ingredients_haz_detail, all_ingredients_haz_general = self._ingredients_hazard_filter()
        if self._display_format == 'detail':
            return self._data[0]
        elif self._display_format ==  'list':
            return {
                'product_ingredients': self._data,
                'product_hazard_avg': self._product_hazard_avg(data=all_ingredients_haz_general),
                'detail_hazard_product': self._product_hazard_aggregate(dataframes=all_ingredients_haz_detail)
            }

    def _ingredients_hazard_filter(self) -> list:
        """
        The method iterates over information about each ingredient in the search results
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
                # formation of data sets for display in the list of results or for the page of each ingredient
                ingredient['hazard']['hazard_ghs_set'] = aggregated_df.to_dict('records')
            else:
                ingredient['hazard']['ingredient_hazard_avg'] = None
        return all_hazard_detail, all_general_hazard

    def _ingredient_hazard_aggregate(self, total_notif: int, sourse: str, data: list) -> pd.DataFrame:
        """
        The module summarizes the notifications about the hazard of a substance
        by their class, within one class it selects those with the largest number of notifications.

        If the dataframe contains hazard classes, the percentage of notifications
        for which is greater than the threshold value, then
        the NO_DATA_AVAILABLE hazard class can be removed, and the number of
        notifications for this class can be subtracted from the total number of notifications.
        If the number of notifications for the existing hazard classes is less than
        the threshold value, then all of them must be removed, and the NO_DATA_AVAILABLE
        class will remain the only one accepted for the substance.
        """
        df = pd.DataFrame(data)

        if total_notif > 0:
            # Count the number of notifications by hazard class NO_DATA_AVAILABLE
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

            # Group notifications by hazard class and save notifications with
            # the highest number_of_notifiers value, delete duplicate notifications.
            df = df.sort_values('number_of_notifiers', ascending=False) \
                .groupby(['hazard_class'], sort=False).first().reset_index()
            # remove unnecessary hazard classes with a percentage value of
            # number_of_notifiers below the threshold self._notif_th
            df = df.drop(df[df["number_of_notifiers"] < total_notif * self._notif_th].index)
        # If the source of the assessment of the substance is Harmonized C&L, then the number of notifications
        # is not indicated, but for the correct operation of the mathematical model we change 0 by one
        elif total_notif == 0 and sourse == 'Harmonised C&L' or bool(sourse) == False:
            df['number_of_notifiers'], total_notif = 1, 1
        # for each of the remaining hazard classes, consider the percentage of notifications
        # from the total number of notifications
        df['percent_notifications'] = (df['number_of_notifiers'] * 100 / total_notif).__round__(self._decimals)
        df['percent_notifications'] = df['percent_notifications'].astype(int)
        return df

    def _ingredient_hazard_avg(self, data: pd.DataFrame) -> float:
        """
        The method calculates a weighted arithmetic mean rating of
        the hazard scale for all classes and the number of notifications
        """
        weighted_score_list = list(
            data['number_of_notifiers'] / data['number_of_notifiers'].sum() * data['hazard_scale_score'])
        general_hazard = sum(weighted_score_list).__round__(self._decimals)
        return general_hazard

    def _product_hazard_aggregate(self, dataframes: list) -> list:
        '''Method calculates the hazard of a product in several hazard classes based on its ingredients'''
        if dataframes:
            df = pd.concat(dataframes, ignore_index=True) # combine hazard data of all ingredients
            df.drop(['ghs_code', 'confirmed_status','number_of_notifiers','percent_notifications'], axis=1, inplace=True)
            # FIXME в detail_hazard_product не попадает класс 'NO_DATA_AVAILABLE',
            #  а для большей понятности желательно его не выбрасывать
            #df = df[df.hazard_class != self._NA]
            same_classes = df.groupby(['hazard_class']) # grouping the same hazard classes
        else:
            return []

        hazard_summary = []
        for hazard_class in same_classes.groups.keys():
            class_group = same_classes.get_group(hazard_class)
            num_of_ingredients = len(class_group) # number of ingredients with hazard class
            # looking for the value of the hazard scale within the class with the maximum number of occurrences
            most_common_hazard_score = class_group['hazard_scale_score'].value_counts().index[0]
            # leave in the dataframe only those data for which the value of the hazard scale is the same
            class_group = class_group.loc[class_group['hazard_scale_score'] == most_common_hazard_score].reset_index()
            # we extract data from the dataframe on the most common value of the hazard scale
            data_to_display = class_group.set_index('index').iloc[0].to_dict()
            data_to_display['num_of_ingredients'] = num_of_ingredients
            hazard_summary.append(data_to_display)

        return hazard_summary

    def _product_hazard_avg(self, data: list) -> float:
        """
        Considers the general hazard of a product by hazard classes of its
        ingredients and returns a single hazard metric
        """
        if data:
            return (sum(data) / len(data)).__round__(self._decimals)
        else:
            return 0