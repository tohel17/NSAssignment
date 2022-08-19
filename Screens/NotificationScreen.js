import {View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from './../Components/CustomButton';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {TriggerNotification} from './../Utils/Notification';
import {useToast} from 'react-native-toast-notifications';

export function NotificationScreen() {
  const [input, setinput] = useState('');
  const toast = useToast();
  const handleNotificationButton = () => {
    if (input !== '') {
      TriggerNotification(input);
    } else {
      toast.show('Please enter text for notification', {
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
        <Header text="Notification Screen" />
        <View style={subConatiner}>
          <CustomInput
            type="default"
            value={input}
            placeHolder={'Enter text for notification'}
            onChangeText={text => {
              setinput(text);
            }}
          />
          <CustomButton
            text={'click me'}
            onPress={handleNotificationButton}
            CustomStyle={buttonStyle}
          />
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
const buttonStyle = {
  backgroundColor: 'red',
};
