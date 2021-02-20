import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { navBarStyle } from '../../utils/help';

import AuthScreen from './auth';

const AuthNavigator: React.FC<NavigatorProps> = ({
  theme,
}) => {
  const Stack = createStackNavigator();

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