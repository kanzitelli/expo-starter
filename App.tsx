import 'expo-dev-client';
import React, {useCallback, useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppRoot} from './src/screens';
import {
  configureDesignSystem,
  getNavigationTheme,
  getStatusBarBGColor,
  getStatusBarStyle,
} from './src/utils/designSystem';
import {hydrateStores} from './src/stores';
import {initServices} from './src/services';
import {SSProvider} from './src/utils/providers';
import {StatusBar} from 'expo-status-bar';
import {useAppearance} from './src/utils/hooks';

LogBox.ignoreLogs(['Require']);

export default (): JSX.Element => {
  useAppearance();
  const [ready, setReady] = useState(false);

  const start = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    configureDesignSystem();
    await initServices();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  if (!ready) return <></>;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SSProvider>
        <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()} />
        <AppRoot navigationContainerProps={{theme: getNavigationTheme()}} />
      </SSProvider>
    </GestureHandlerRootView>
  );
};
