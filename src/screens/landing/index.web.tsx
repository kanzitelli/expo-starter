import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from '../auth';
import LandingScreen from './landing';

const LandingNavigator: React.FC<NavigatorProps> = ({
}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode={'modal'}>
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