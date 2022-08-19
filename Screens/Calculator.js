import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {CustomButton} from './../Components/CustomButton';
import {DropdownComponent} from './../Components/DropdownComponent';
import {useToast} from 'react-native-toast-notifications';

const DropDownData = [
  {label: 'Addition', value: 'Addition'},
  {label: 'Subtract', value: 'Subtract'},
  {label: 'Multiply', value: 'Multiply'},
];
export function Calculator() {
  const [firstNum, setfirst] = useState('');
  const [secondNum, setsecond] = useState('');
  const [Operation, setOperation] = useState('Addition');
  const toast = useToast();

  const handleOnClick = () => {
    if (firstNum === '' && secondNum === '') {
      toast.show('Enter Numbers', {
        type: 'normal',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };
  return (
    <SafeAreaView style={safeAreaConatiner}>
      <View style={mainContainer}>
        <Header text="Calculator" />
        <View style={subConatiner}>
          <CustomInput
            type="number-pad"
            value={firstNum}
            placeHolder={'Enter Number'}
            onChangeText={text => {
              setfirst(text);
            }}
          />
          <CustomInput
            type="number-pad"
            value={secondNum}
            placeHolder={'Enter Number'}
            onChangeText={text => {
              setsecond(text);
            }}
          />
          <DropdownComponent
            data={DropDownData}
            value={Operation}
            updateValue={data => {
              setOperation(data);
            }}
          />
          <CustomButton text={`Perfrom ${Operation}`} onPress={handleOnClick} />
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
};
