import 'expo-dev-client';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LogBox} from 'react-native';

import * as Linking from 'expo-linking';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavioApp} from '@app/navio';
import {
  configureDesignSystem,
  getNavigationTheme,
  getStatusBarBGColor,
  getStatusBarStyle,
} from '@app/utils/designSystem';
import {hydrateStores} from '@app/stores';
import {initServices} from '@app/services';
import {AppProvider} from '@app/utils/providers';
import {useAppearance} from '@app/utils/hooks';

LogBox.ignoreLogs([
  'Require',
  'Found screens with the same name nested inside one another.', // for navio in some cases
]);

export default (): JSX.Element => {
  useAppearance();
  const [ready, setReady] = useState(false);

  // `onLaunch` performs actions that have to be done on app launch before displaying app UI.
  // If you need to make some api requests, load remote config, or some other "heavy" actions, you can use `@app/services/onLaunch.tsx`.
  const onLaunch = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    configureDesignSystem();
    await initServices();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLaunch();
  }, [onLaunch]);

  const NotReady = useMemo(() => {
    // [Tip]
    // You can show loading state here.
    return <></>;
  }, [ready]);

  if (!ready) return NotReady;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()} />
        <NavioApp
          navigationContainerProps={{
            theme: getNavigationTheme(),
            linking: {
              prefixes: [Linking.createURL('/')],
            },
          }}

          // [Tip]
          // You can use `root` to change the root of the app depending on global state changes.
          // root={isLoggedIn ? 'AuthStack' : 'AppTabs'}
        />
      </AppProvider>
    </GestureHandlerRootView>
  );
};
