import React from 'react';

import {OnStartService} from './onStart';
import {TranslateService} from './translate';
import {ApiService} from './api';
import {getNavio} from '../screens';

class Services {
  t = new TranslateService();
  onStart = new OnStartService();
  api = new ApiService();

  // -- adding navio as a service
  get navio() {
    return getNavio();
  }
}
export const services = new Services();

const servicesContext = React.createContext<Services>(services);
export const ServicesProvider = ({children}: any) => (
  <servicesContext.Provider value={services}>{children}</servicesContext.Provider>
);
export const useServices = (): Services => React.useContext(servicesContext);

export const initServices = async (): PVoid => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as any)[key] as IService;

      if (s.init) {
        await s.init();
      }
    }
  }
};
