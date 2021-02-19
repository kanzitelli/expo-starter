import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { If } from '@kanzitelli/if-component';

import MainNavigator from './screens/main';
import LandingNavigator from './screens/landing';

export const AppStack: React.FC<AppStackProps> = ({ authed }) => {
  return (
    <NavigationContainer>
      <If _={authed}
      _then={<MainNavigator />}
      _else={<LandingNavigator />} />
    </NavigationContainer>
  )
};