import React, {PropsWithChildren} from 'react';

import {ServicesProvider} from '../services';
import {StoresProvider} from '../stores';

export const SSProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <StoresProvider>
      <ServicesProvider>{children}</ServicesProvider>
    </StoresProvider>
  );
};
