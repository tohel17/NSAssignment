/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SetupLocalNotification} from './Utils/Notification';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AppNavigator} from './Navigation/AppNavigator';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <ToastProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
      </SafeAreaProvider>
    </ToastProvider>
  );
};
SetupLocalNotification();
export default App;
