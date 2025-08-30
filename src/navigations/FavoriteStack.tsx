import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import DetailsPage from '../pages/DetailsPage';
import FavoritesPage from '../pages/FavoritesPage';

const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoritesPage"
        component={FavoritesPage}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="DetailsPage"
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
