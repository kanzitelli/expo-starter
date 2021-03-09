import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { navBarStyle } from '../../utils/help';

import MainScreen from './main';
import SettingsScreen from './settings';

const MainNavigator: React.FC<NavigatorProps> = ({
}) => {
  const MainStack = createNativeStackNavigator();
  const Main = () => (
    <MainStack.Navigator screenOptions={navBarStyle()}>
      <MainStack.Screen
        name={'MainScreen'}
        component={MainScreen}
        options={{
          title: 'Main',
        }}
      />
    </MainStack.Navigator>
  )

  const SettingsStack = createNativeStackNavigator();
  const Settings = () => (
    <SettingsStack.Navigator screenOptions={navBarStyle()}>
      <SettingsStack.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </SettingsStack.Navigator>
  )

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case 'Main':
                return focused
                  ? 'file-tray-full'
                  : 'file-tray-full-outline';
              case 'Settings':
                return focused
                  ? 'cog'
                  : 'cog-outline';
            }
          })();

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={'Main'}
        component={Main}
        options={{ title: 'Main' }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigator;