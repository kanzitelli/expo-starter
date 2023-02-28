import React, {PropsWithChildren} from 'react';

import {ServicesProvider} from '@app/services';
import {StoresProvider} from '@app/stores';

export const AppProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};
