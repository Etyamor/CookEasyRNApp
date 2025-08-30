import React from 'react';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { StatusBar } from 'react-native';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NoSafeAreaLayout verticalPadding={0}>
        <RegisterForm />
      </NoSafeAreaLayout>
    </>
  );
};

export default RegisterPage;
