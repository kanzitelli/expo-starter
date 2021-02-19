import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { navBarStyle } from '../../utils/help';

import LandingScreen from './landing';

const ExampleNavigator: React.FC<NavigatorProps> = ({
  theme,
}) => {
  const Stack = createNativeStackNavigator();
  // const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle(theme)}>
      <Stack.Screen
        name={'Landing'}
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      {/* <Stack.Screen
        name={'Auth'}
        component={AuthScreen}
        options={{
          stackPresentation: 'modal',
        }}
      /> */}
    </Stack.Navigator>
  )
};

export default ExampleNavigator;