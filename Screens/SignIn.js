import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from './../Components/CustomButton';
import {CustomInput} from './../Components/CustomInput';
import {useToast} from 'react-native-toast-notifications';
import {LoginContext} from '../Context/LoginContext';
import {ValidateEmail} from './../Utils/Utils';

export function SignIn({navigation}) {
  const [Email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const {itsloggedIn, Userlogin} = useContext(LoginContext);
  const toast = useToast();

  const LoginHandler = async () => {
    if (ValidateEmail(Email) && password !== '') {
      const res = await Userlogin(Email, password);
      toast.show(res.message, {
        type: 'normal',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (!ValidateEmail(Email)) {
      toast.show('Enter valid mail', {
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
          <Text style={header}>Login</Text>
          <Text style={Context}>
            Hey,Enter your details to get sign in to your account
          </Text>

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
          <Text style={forgotText} onPress={() => {}}>
            Forgot password?
          </Text>
          <CustomButton
            text={'Sign in'}
            onPress={LoginHandler}
            CustomStyle={Button}
          />
          <Text style={BottomText}>
            Don't have an account?
            <Text
              style={SignUp}
              onPress={() => {
                navigation.navigate('signUp');
              }}>
              {' '}
              Sign up
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

const forgotText = {
  color: 'black',
  fontSize: 12,
  marginVertical: 10,
  alignSelf: 'flex-end',
};

const Button = {
  width: '90%',
};

const BottomText = {
  color: 'black',
  fontSize: 15,
  marginVertical: 30,
};

const SignUp = {
  fontWeight: 'bold',
};
