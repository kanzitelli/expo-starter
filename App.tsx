import React, {useCallback, useEffect, useState} from 'react';

import {AppNavigator} from './src/app';
import {configureDesignSystem} from './src/utils/designSystem';
import {hydrateStores, StoresProvider} from './src/stores';
import {initServices} from './src/services';

export default (): JSX.Element => {
  const [ready, setReady] = useState(false);

  const startApp = useCallback(async () => {
    await hydrateStores();
    await initServices();
    configureDesignSystem();

    setReady(true);
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
