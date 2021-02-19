import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { navBarStyle } from '../../utils/help';

import AuthScreen from './auth';

const AuthNavigator: React.FC<NavigatorProps> = ({
  theme,
}) => {
  const Stack = createNativeStackNavigator();
  // const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle(theme)}>
      <Stack.Screen
        name={'AuthScreen'}
        component={AuthScreen}
      />
    </Stack.Navigator>
  )
};

export default AuthNavigator;