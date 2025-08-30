import React, { useState } from 'react';
import { Text, TextInput, View, TextInputProps, TouchableOpacity } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';


type FormInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  hide?: boolean;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry'>;

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
    <View>
      {!!label && (
        <Text>{label}</Text>
      )}
      <View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#8F9098"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isHidden}
          {...rest}
        />
        {hide && (
          <TouchableOpacity
            onPress={() => setIsHidden((prev) => !prev)}
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

export default FormInput;