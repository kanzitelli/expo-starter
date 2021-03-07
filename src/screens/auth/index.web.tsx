import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './auth';

const AuthNavigator: React.FC<NavigatorProps> = ({
}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'AuthScreen'}
        component={AuthScreen}
      />
    </Stack.Navigator>
  )
};

export default AuthNavigator;