import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useTheme } from '@emotion/react';
import { If } from '@kanzitelli/if-component';

import MainNavigator from './screens/main';
import LandingNavigator from './screens/landing';

export const AppStack: React.FC<AppStackProps> = ({ authed, themeMode }) => {
  const EmotionTheme = useTheme();
  console.log('authed', authed, themeMode);

  // https://reactnavigation.org/docs/themes
  // https://emotion.sh/docs/theming
  const CurrentTheme = themeMode === 'dark' ? DarkTheme : DefaultTheme;
  const MyTheme = {
    ...CurrentTheme,
    colors: {
      ...CurrentTheme.colors,
      ...EmotionTheme.colors,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <If _={authed}
      _then={<MainNavigator />}
      _else={<LandingNavigator />} />
    </NavigationContainer>
  )
};