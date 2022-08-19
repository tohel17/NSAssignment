import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {CustomButton} from './../Components/CustomButton';

export function TextScreen() {
  const [input, setinput] = useState('');

  return (
    <SafeAreaView style={safeAreaConatiner}>
      <View style={mainContainer}>
        <Header text="Text Screen" />
        <View style={subConatiner}>
          <CustomInput
            type="default"
            value={input}
            placeHolder={'Enter text'}
            onChangeText={text => {
              setinput(text);
            }}
          />
          <CustomButton text={'click me'} onPress={() => {}} />
          <View style={TextContainer}>
            {input != '' && (
              <Text style={textField}>Your entered text is {input}</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const safeAreaConatiner = {
  flex: 1,
  backgroundColor: 'white',
};
const mainContainer = {
  flex: 1,
  paddingHorizontal: 10,
};
const subConatiner = {
  flex: 1,
  justifyContent: 'center',
};
const TextContainer = {
  paddingVertical: 10,
};
const textField = {
  color: 'black',
  fontSize: 20,
};
