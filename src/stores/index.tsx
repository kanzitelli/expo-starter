import React from 'react';

import './_hydration';
import {UI} from './ui';
import {Counter} from './counter';

export const stores = {
  ui: new UI(),
  counter: new Counter(),
};
type ContextStores = typeof stores;

const storeContext = React.createContext<ContextStores>(stores);
export const StoresProvider = ({children}: any) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = (): ContextStores => React.useContext(storeContext);

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as Stores)[key];

      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};
