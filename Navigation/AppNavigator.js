/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, useBackButtonHandler} from './navigation-utilities';
import {LoginNavigator} from './LoginNavigator';
import {RootNavigator} from './RootNavigator';

const AppStack = () => {
  //once loaded will redirect to login or home
  if (false) {
    return <LoginNavigator />;
  } else {
    return <RootNavigator />;
  }
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
