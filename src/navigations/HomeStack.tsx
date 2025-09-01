import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';
import { SCREENS } from '../constants';
import HeaderHeart from '../components/HeaderHeart';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.DETAILS}
        component={DetailsPage}
        options={({ route }) => ({
          title: route.params?.recipe.name || 'Recipe Details',
          headerBackTitle: '',
          headerRight: () => <HeaderHeart recipeId={route.params?.recipe.id} />,
        })}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;
