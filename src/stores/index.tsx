import React from 'react';

import GlobalStore from './global';

export const stores = {
  G: GlobalStore,
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