import 'expo-dev-client';
import React, {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {LogBox} from 'react-native';

import {AppNavigator} from './src/app';
import {configureDesignSystem} from './src/utils/designSystem';
import {hydrateStores, StoresProvider} from './src/stores';
import {initServices} from './src/services';

LogBox.ignoreLogs(['Require']);

export default (): JSX.Element => {
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    await initServices();
    configureDesignSystem();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return (
    <StoresProvider>
      <StoresProvider>{ready ? <AppNavigator /> : null}</StoresProvider>
    </StoresProvider>
  );
};
