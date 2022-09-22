import 'expo-dev-client';
import React, {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppRoot} from './src/screens';
import {configureDesignSystem} from './src/utils/designSystem';
import {hydrateStores} from './src/stores';
import {initServices} from './src/services';
import {AppearanceProvider, SSProvider} from './src/utils/providers';

LogBox.ignoreLogs(['Require']);

export default (): JSX.Element => {
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    configureDesignSystem();
    await initServices();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  if (!ready) <></>;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SSProvider>
        <AppearanceProvider>
          <AppRoot />
        </AppearanceProvider>
      </SSProvider>
    </GestureHandlerRootView>
  );
};
