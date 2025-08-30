import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Colors, Fonts, Spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../constants';

const LoginForm = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/480/270' }}
        style={styles.image}
      />
      <Text style={styles.title}>Restore password</Text>
      <FormInput placeholder="Email Address" />
      <FormButton title="Reset" />
      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: SCREENS.LOGIN as never }] })}>
          <Text style={styles.registerLink}>Back to login</Text>
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
    fontFamily: Fonts.inter,
    fontWeight: '700',
    fontSize: 24,
  },
  forgotPassword: {
    fontFamily: Fonts.inter,
    fontWeight: '700',
    fontSize: 12,
    color: Colors.blue['500'],
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  registerText: {
    fontFamily: Fonts.inter,
    fontSize: 12,
    color: Colors.dark['500'],
  },
  registerLink: {
    fontFamily: Fonts.inter,
    fontWeight: '700',
    fontSize: 12,
    color: Colors.blue['500'],
  },
});

export default LoginForm;
