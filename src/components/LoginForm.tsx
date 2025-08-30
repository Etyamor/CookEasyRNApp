import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { Colors, Fonts, Spacing } from '../../theme';

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/480/270' }}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome!</Text>
      <FormInput placeholder="Email Address" />
      <FormInput placeholder="Password" hide={true} />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <FormButton title="Login" />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Not a member?</Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Spacing.md,
  },
  image: {
    width: screenWidth,
    height: screenWidth * (9 / 16),
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
  },
  forgotPassword: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.blue["500"]
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  registerText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.dark["500"]
  },
  registerLink: {
    fontFamily: Fonts.bold,
    fontSize: 12,
    color: Colors.blue["500"]
  },
});

export default LoginForm;