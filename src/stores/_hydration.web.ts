import {configurePersistable} from 'mobx-persist-store';

// localStorage configuration
configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: async (key, value) => {
      await localStorage.setItem(key, value);
      return Promise.resolve();
    },
    getItem: async key => {
      const value = await localStorage.getItem(key);
      return Promise.resolve(value);
    },
    removeItem: async key => {
      await localStorage.removeItem(key);
      return Promise.resolve();
    },
  },
});
