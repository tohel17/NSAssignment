import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignUp, NotificationScreen} from '../Screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, size}) => {
            let iconName;
            if (route.name === 'Notification') {
              iconName = focused ? 'notifications-none' : 'notifications-none';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'user' : 'user';
            }
            return <Icon name={iconName} size={size} color={'red'} />;
          },
          //tabBarStyle: { backgroundColor: colors.background },
          headerShown: false,
        };
      }}>
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="ProfileStack" component={SignUp} />
    </Tab.Navigator>
  );
};
