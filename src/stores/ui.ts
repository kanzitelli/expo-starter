import { makeAutoObservable } from 'mobx';
import { isSynchronized, persistence } from 'mobx-persist-store';
import { storageAdapter } from './hydration';

class UIStore {
  themeMode: ThemeMode = 'light';
  setThemeMode = (v: ThemeMode) => { this.themeMode = v; }
  toggleThemeMode = () => { this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark'; }

  get isSynced() {
    return isSynchronized(this)
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'UIStore',
  properties: ['themeMode'],
  adapter: storageAdapter,
})(new UIStore());

// export default new ExampleStore();