import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React from 'react';

export function CustomButton({isloading, text, onPress, CustomStyle}) {
  const styles = [ToucableMain, CustomStyle];
  return (
    <TouchableOpacity style={styles} onPress={onPress ? onPress : null}>
      {isloading ? (
        <ActivityIndicator size="small" color={'white'} />
      ) : (
        <Text style={TextStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}
const ToucableMain = {
  backgroundColor: '#ff3e6c',
  paddingVertical: 10,
  paddingHorizontal: 5,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
};

const TextStyle = {
  color: 'white',
  fontSize: 19,
};
