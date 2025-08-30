import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

const LoginForm = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <FormInput placeholder="Email Address" />
      <FormInput placeholder="Password" hide={true} />
      <TouchableOpacity>
        <Text>Forgot password?</Text>
      </TouchableOpacity>
      <FormButton title="Login" />
      <View>
        <Text>Not a member?</Text>
        <TouchableOpacity>
          <Text>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;