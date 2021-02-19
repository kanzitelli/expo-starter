import React from 'react';

import AuthService from './auth';

export const services = {
  auth: AuthService,
};

const servicesContext = React.createContext(services);

export const ServicesProvider = ({ children }: any) => {
  return (
    <servicesContext.Provider value={services}>
      { children }
    </servicesContext.Provider>
  );
};

export const useServices = () => React.useContext(servicesContext);

export const initServices = async () => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = services[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};