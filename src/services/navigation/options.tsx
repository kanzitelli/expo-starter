import React from 'react';
import {Platform} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from 'react-native-ui-lib';

import {getHeaderBlurEffect} from '../../utils/designSystem';
import {Icon} from '../../components/icon';
import {TabName} from '../../screens';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.primary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(), // this sets up blurred nav bar
      // if you'd like to have a solid color for a nav bar, then you should
      // set up `headerStyle: {backgroundColor: Colors.bg2Color}`
    },
  }),
});

export const tabBarDefaultOptions = (tabName: TabName): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
  tabBarIcon: ({focused, color, size}) => (
    <Icon name={getTabIconName(tabName, focused)} size={size} color={color} />
  ),
});

const getTabIconName = (tabName: TabName, focused: boolean): string => {
  if (tabName === 'MainTab') {
    return focused ? 'home' : 'home-outline';
  }
  if (tabName === 'PlaygroundTab') {
    return focused ? 'construct' : 'construct-outline';
  }
  if (tabName === 'SettingsTab') {
    return focused ? 'settings' : 'settings-outline';
  }

  return 'list';
};
