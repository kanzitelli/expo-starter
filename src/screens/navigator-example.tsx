import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';

import { navBarStyle } from '../utils/help';
import { useServices } from '../services';

import MainScreen from './main/main';
// import AuthScreen from './auth/auth';

const ExampleNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const Stack = createNativeStackNavigator();
  // const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle()}>
      <Stack.Screen
        name={'Main'}
        component={MainScreen}
        options={{
          title: t.do('example.title'),
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