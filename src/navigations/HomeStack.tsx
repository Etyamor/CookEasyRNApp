import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsPage"
        component={DetailsPage}
        options={{ title: 'Recipe Name', headerBackTitle: '' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
