import React, {useEffect} from 'react';
import {SetupLocalNotification} from './Utils/Notification';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AppNavigator} from './Navigation/AppNavigator';
import {ToastProvider} from 'react-native-toast-notifications';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
