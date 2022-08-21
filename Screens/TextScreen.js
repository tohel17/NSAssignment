import {View, Text} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {CustomButton} from './../Components/CustomButton';
import {firebase} from '@react-native-firebase/database';
import {LoginContext} from '../Context/LoginContext';
import {useToast} from 'react-native-toast-notifications';

export function TextScreen() {
  const [input, setinput] = useState('');
  const {UploadText} = useContext(LoginContext);
  const [UpdatedText, setUpdatedText] = useState('');
  const toast = useToast();

  const UpdateTextHandler = async () => {
    if (input !== '') {
      const res = await UploadText(input);
      setinput('');
      toast.show(res.message, {
        type: 'normal',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      toast.show('Please enter text.', {
        type: 'normal',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };
  useEffect(() => {
    const onValueChange = firebase
      .app()
      .database(
        'https://testing-b41ff-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/Main/Text`)
      .on('value', snapshot => {
        setUpdatedText(snapshot.val());
      });
  }, []);

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
          <CustomButton
            text={'Click me to update text'}
            onPress={UpdateTextHandler}
          />
          <View style={TextContainer}>
            {UpdatedText != '' && (
              <Text style={textField}>
                Your last entered text is {UpdatedText}
              </Text>
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
