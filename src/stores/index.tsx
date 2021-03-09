import React from 'react';

import GlobalStore from './global';
import UIStore from './ui';

export const stores = {
  G: GlobalStore,
  ui: UIStore,
};

const storeContext = React.createContext(stores);

export const StoresProvider = ({ children }: any) => {
  return (
    <storeContext.Provider value={stores}>
      { children }
    </storeContext.Provider>
  );
};

export const useStores = () => React.useContext(storeContext);