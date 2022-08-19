import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignIn, SignUp} from './../Screens';

const Stack = createNativeStackNavigator();

export function LoginNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signIn">
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
    </Stack.Navigator>
  );
}
