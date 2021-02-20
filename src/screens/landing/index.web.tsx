import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { navBarStyle } from '../../utils/help';

import AuthNavigator from '../auth';
import LandingScreen from './landing';

const LandingNavigator: React.FC<NavigatorProps> = ({
  theme,
}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle(theme)} mode={'modal'}>
      <Stack.Screen
        name={'Landing'}
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      <Stack.Screen
        name={'Auth'}
        component={AuthNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default LandingNavigator;