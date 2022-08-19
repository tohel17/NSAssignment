import {View, Text} from 'react-native';
import React from 'react';

export function Header({text}) {
  return (
    <View style={HeadarContainer}>
      <Text style={TextStyle}>{text}</Text>
    </View>
  );
}
const HeadarContainer = {
  height: 50,
  paddingHorizontal: 10,
  justifyContent: 'center',
};

const TextStyle = {
  color: '#ff3e6c',
  fontSize: 20,
};
