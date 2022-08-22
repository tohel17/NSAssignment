import {View, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from './../Components/CustomButton';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {TriggerNotification} from './../Utils/Notification';
import {useToast} from 'react-native-toast-notifications';
import {ValidateEmail} from './../Utils/Utils';
import {LoginContext} from '../Context/LoginContext';
import {BarPasswordStrengthDisplay} from 'react-native-password-strength-meter';

export function SignUp({navigation}) {
  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [ReEnterPassword, setReEnterPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  const {signUp} = useContext(LoginContext);
  const ButtonHandler = async () => {
    if (password === ReEnterPassword) {
      if (ValidateEmail(Email) && password.length >= 5) {
        setisLoading(true);
        const response = await signUp(Email, password);
        toast.show(response.message, {
          type: 'normal',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        setisLoading(false);
      } else if (!ValidateEmail(Email)) {
        toast.show('Enter valid mail', {
          type: 'normal',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else if (password.length < 5) {
        toast.show('Password length should be greater than 5 charcaters.', {
          type: 'normal',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    } else {
      toast.show('Password does nat match', {
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
        <View style={Card}>
          <Text style={header}>Register</Text>
          <CustomInput
            type="default"
            value={Email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeHolder="Email"
            customStyle={inputStyle}
          />
          <CustomInput
            type="password"
            value={password}
            onChangeText={text => {
              setpassword(text);
            }}
            placeHolder="Password"
            customStyle={inputStyle}
          />
          <CustomInput
            type="password"
            value={ReEnterPassword}
            onChangeText={text => {
              setReEnterPassword(text);
            }}
            placeHolder="Re-enter password"
            customStyle={inputStyle}
          />
          <BarPasswordStrengthDisplay
            password={ReEnterPassword}
            minLength={3}
            width={250}
          />
          <CustomButton
            text={'Sign Up'}
            onPress={ButtonHandler}
            CustomStyle={Button}
            isLoading={isLoading}
          />
          <Text style={BottomText}>
            Alreay have an account?
            <Text
              style={SignInText}
              onPress={() => {
                navigation.navigate('signIn');
              }}>
              Sign in
            </Text>
          </Text>
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
  justifyContent: 'center',
  alignItems: 'center',
};

const Card = {
  shadowColor: 'grey',
  shadowOffset: {
    width: -2,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2.0,
  elevation: 15,

  borderRadius: 10,
  width: '90%',
  backgroundColor: 'white',
  paddingVertical: 20,
  paddingHorizontal: 10,
  alignItems: 'center',
  marginHorizontal: 10,
};

const header = {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'black',
};

const Context = {
  textAlign: 'center',
  fontSize: 15,
  color: 'black',
  marginVertical: 10,
};

const inputStyle = {
  width: '90%',
  marginBottom: 0,
};

const Button = {
  width: '90%',
  marginVertical: 30,
};

const BottomText = {
  color: 'black',
  fontSize: 15,
  marginVertical: 10,
};

const SignInText = {
  fontWeight: 'bold',
};
