import React, {PropsWithChildren} from 'react';

import {ServicesProvider} from '@app/services';
import {StoresProvider} from '@app/stores';

/**
 * `AppProvider` contains providers for stores and services to have access to them inside screens.
 */
export const AppProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};
