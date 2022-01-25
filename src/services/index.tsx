import React from 'react';

import {OnStart} from './onStart';
import {Nav} from './navigation';
import {Translate} from './translate';
import {Api} from './api';

export const services = {
  t: new Translate(), // should be first
  nav: new Nav(),
  onStart: new OnStart(),
  api: new Api(),
};
type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
export const ServicesProvider = ({children}: any) => (
  <servicesContext.Provider value={services}>{children}</servicesContext.Provider>
);

export const useServices = (): ContextServices => React.useContext(servicesContext);

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};
