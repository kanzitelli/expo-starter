import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import { Observer } from 'mobx-react';

import { AppStack } from './src/app';
import { StoresProvider, useStores } from './src/stores';
import { initServices, ServicesProvider, useServices } from './src/services';

enableScreens();
initServices();

export default () => {
  const { G } = useStores();

  useEffect(() => { start() }, []);

  const start = async () => { }

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
