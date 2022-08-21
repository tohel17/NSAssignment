/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, {useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {LoginNavigator} from './LoginNavigator';
import {RootNavigator} from './RootNavigator';
import {LoginProvider} from './../Context/LoginContext';
import {LoginContext} from '../Context/LoginContext';

const AppStack = () => {
  const {isloggedIn} = useContext(LoginContext);
  if (!isloggedIn) {
    return <LoginNavigator />;
  } else {
    return <RootNavigator />;
  }
};

export const AppNavigator = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </LoginProvider>
  );
};
