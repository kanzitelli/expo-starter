import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';

import { AppStack } from './src/app';

enableScreens();

export default () => {
  useEffect(() => { start() }, []);

  const start = async () => { }

  return (
    <>
      <StatusBar style={'dark'} />
      <AppStack authed />
    </>
  );
}
