import {View, TextInput} from 'react-native';
import React from 'react';

export function CustomInput({value, type, onChangeText, placeHolder}) {
  const showPassword = type == 'password';
  return (
    <TextInput
      placeholder={placeHolder}
      placeholderTextColor={'grey'}
      style={inputStyles}
      value={value}
      secureTextEntry={showPassword}
      keyboardType={type !== 'password' ? type : 'default'}
      onChangeText={onChangeText}
    />
  );
}

const inputStyles = {
  borderColor: '#ff3e6c',
  borderRadius: 15,
  borderWidth: 1,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginVertical: 10,
  color: 'black',
};
