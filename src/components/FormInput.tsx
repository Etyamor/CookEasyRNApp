import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Colors, Fonts, Spacing } from '../../theme';

type FormInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  hide?: boolean;
} & Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry'
>;

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  hide,
  ...rest
}) => {
  const [isHidden, setIsHidden] = useState(!!hide);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8F9098"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isHidden}
          {...rest}
        />
        {hide && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsHidden(prev => !prev)}
            activeOpacity={0.7}
          >
            {isHidden ? (
              <Ionicons name="eye-off-outline" size={16} />
            ) : (
              <Ionicons name="eye-outline" size={16} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  label: {
    fontFamily: Fonts.inter,
    fontSize: 14,
    color: Colors.dark['500'],
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    paddingRight: 40,
    borderRadius: 12,
    fontFamily: Fonts.inter,
    fontSize: 14,
    color: Colors.dark['500'],
    borderWidth: 1,
    borderColor: Colors.light['500'],
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -8 }],
  },
});

export default FormInput;
