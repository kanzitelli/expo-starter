import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { navBarStyle } from '../../utils/help';

import AuthScreen from './auth';

const AuthNavigator: React.FC<NavigatorProps> = ({
}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle()}>
      <Stack.Screen
        name={'AuthScreen'}
        component={AuthScreen}
      />
    </Stack.Navigator>
  )
};

export default AuthNavigator;