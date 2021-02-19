import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { Observer } from 'mobx-react';

import { AppStack } from './src/app';
import { StoresProvider, useStores } from './src/stores';
import { initServices, ServicesProvider } from './src/services';
import { reaction } from 'mobx';

enableScreens();
initServices();

export default () => {
  const { G } = useStores();
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
          <>
            <StatusBar style={'dark'} />
            <AppStack authed={G.isAuthed} />
          </>
        )}
      </Observer>
    </ServicesProvider></StoresProvider>
  );
}
