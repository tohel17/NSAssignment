import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NotificationScreen,
  ImageScreen,
  TextScreen,
  Calculator,
} from '../Screens';
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
              iconName = 'notifications-none';
            } else if (route.name === 'Image') {
              iconName = 'image';
            } else if (route.name === 'Text') {
              iconName = 'text-fields';
            } else if (route.name === 'Calculator') {
              iconName = 'calculate';
            }
            return <Icon name={iconName} size={size} color={'#ff3e6c'} />;
          },
          //tabBarStyle: { backgroundColor: colors.background },
          headerShown: false,
        };
      }}>
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Image" component={ImageScreen} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  );
};
