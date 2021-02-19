import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './screens/main';
import LandingNavigator from './screens/landing';

export const AppStack: React.FC<AppStackProps> = ({ authed }) => {
  return (
    <NavigationContainer>
      { authed ? <MainNavigator /> : <LandingNavigator />}
    </NavigationContainer>
  )
};