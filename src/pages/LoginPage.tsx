import React from 'react';
import LoginForm from '../components/LoginForm';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { StatusBar } from 'react-native';

const LoginPage = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NoSafeAreaLayout verticalPadding={0}>
        <LoginForm />
      </NoSafeAreaLayout>
    </>
  );
};

export default LoginPage;
