import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './screens/main';

export const AppStack: React.FC<AppStackProps> = ({}) => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
};