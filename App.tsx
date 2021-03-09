import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { reaction } from 'mobx';
import { Observer } from 'mobx-react';
import { ThemeProvider } from '@emotion/react';

import { AppStack } from './src/app';
import { StoresProvider, useStores } from './src/stores';
import { initServices, ServicesProvider } from './src/services';
import { getStatusBarStyle, getTheme } from './src/utils/themePresets';

enableScreens();
initServices();

export default () => {
  const { G, ui } = useStores();
  const [ready, setReady] = useState(false);

  useEffect(() => { start() }, []);

  const start = async () => {
    if (G.isSynced) startApp();
    reaction(() => G.isSynced === true, startApp);
  }

  const startApp = () => {
    setReady(true);
  }

  if (!ready) return null;

  return (
    <StoresProvider><ServicesProvider>
      <Observer>
        {() => (
          <ThemeProvider theme={getTheme(ui.themeMode)}>
            <StatusBar style={getStatusBarStyle(ui.themeMode)} />
            <AppStack authed={G.isAuthed} themeMode={ui.themeMode} />
          </ThemeProvider>
        )}
      </Observer>
    </ServicesProvider></StoresProvider>
  );
}
