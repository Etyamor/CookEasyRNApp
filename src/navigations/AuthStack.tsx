import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPage from '../pages/ForgotPage';
import { SCREENS } from '../constants';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.REGISTER}
        component={RegisterPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.FORGOT}
        component={ForgotPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
