import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

import {Root} from './screens';
import {getNavigationTheme, getStatusBarStyle, getStatusBarBGColor} from './utils/designSystem';
import {useServices} from './services';

export const AppNavigator = (): JSX.Element => {
  useColorScheme();
  const {nav} = useServices();

  return (
    <>
      <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()} />
      <NavigationContainer
        ref={nav.n}
        onReady={nav.onReady}
        onStateChange={nav.onStateChange}
        theme={getNavigationTheme()}
      >
        <Root />
      </NavigationContainer>
    </>
  );
};
