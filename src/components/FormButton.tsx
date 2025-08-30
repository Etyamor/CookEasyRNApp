import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts, Spacing } from '../../theme';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

const FormButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: Colors.blue['500'],
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: Colors.blue['300'],
  },
  text: {
    fontFamily: Fonts.inter,
    fontWeight: '700',
    fontSize: 12,
    color: Colors.light['100'],
    textAlign: 'center',
  },
});

export default FormButton;
