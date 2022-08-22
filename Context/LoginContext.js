import {View, Text} from 'react-native';
import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {config} from './../Environment';
export const LoginContext = createContext();
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

export function LoginProvider({children}) {
  const [isloggedIn, setisloggedIn] = useState(false);

  const signUp = async (email, password) => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      setisloggedIn(true);
      return {
        result: true,
        message: 'Succesfully created an account',
      };
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        return {
          result: false,
          message: 'Account this with email already exist.',
        };
      } else if (err.code === 'auth/invalid-email') {
        return {
          result: false,
          message: 'That email address is invalid!',
        };
      } else {
        return {
          result: false,
          message: 'Something went wrong, Please try again later.',
        };
      }
    }
  };

  const Userlogin = async (email, password) => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      setisloggedIn(true);
      console.log('----', res);
      return {
        result: true,
        message: 'Succesfully logged in',
      };
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log('xxx', errorCode, 'dsf', errorMessage);
      if (errorCode === 'auth/wrong-password') {
        return {
          result: false,
          message: 'Invalid password',
        };
      } else {
        return {
          result: false,
          message: errorMessage,
        };
      }
    }
  };

  const UploadText = async text => {
    try {
      const reference = await firebase
        .app()
        .database(config.fireBaseDB)
        .ref('/Main')
        .update({
          Text: text,
        });
      return {
        result: true,
        message: 'Data Updated.',
      };
    } catch (err) {
      console.log(err);
      return {
        result: false,
        message: 'Something went wrong, Please try again later.',
      };
    }
  };

  const uploadImage = async (path, fileName) => {
    try {
      //const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/Images.png`;
      let reference = storage().ref('Images'); //to upload multiple images replace 'images' with file name
      let task = await reference.putFile(path);
      if ((task.state = 'success')) {
        return {
          result: true,
          message: 'Successfully uploaded the photo.',
        };
      } else {
        return {
          result: false,
          message: 'Something went wrong please try again later',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        result: false,
        message: 'Something went wrong please try again later',
      };
    }
  };
  return (
    <LoginContext.Provider
      value={{isloggedIn, signUp, Userlogin, UploadText, uploadImage}}>
      {children}
    </LoginContext.Provider>
  );
}
