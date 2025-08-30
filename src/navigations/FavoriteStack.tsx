import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsPage from '../pages/DetailsPage';
import FavoritesPage from '../pages/FavoritesPage';
import { SCREENS } from '../constants';

const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesPage}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name={SCREENS.DETAILS}
        component={DetailsPage}
        options={{
          title: 'Recipe Name',
          headerBackTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
