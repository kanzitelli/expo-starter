import React, {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

import {ServicesProvider, useServices} from '../services';
import {getStatusBarStyle, getStatusBarBGColor, getNavigationTheme} from './designSystem';
import {StoresProvider} from '../stores';
import {useAppearance} from './hooks';

export const AppearanceProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  useAppearance();
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
        {children}
      </NavigationContainer>
    </>
  );
};

export const SSProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};
