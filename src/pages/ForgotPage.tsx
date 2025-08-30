import React from 'react';
import ForgotForm from '../components/ForgotForm';
import NoSafeAreaLayout from '../layouts/NoSafeAreaLayout';
import { StatusBar } from 'react-native';

const ForgotPage = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NoSafeAreaLayout verticalPadding={0}>
        <ForgotForm />
      </NoSafeAreaLayout>
    </>
  );
};

export default ForgotPage;
