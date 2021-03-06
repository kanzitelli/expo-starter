import { makeAutoObservable } from 'mobx';
import { isSynchronized, persistence } from 'mobx-persist-store';
import { storageAdapter } from './hydration';

class ExampleStore {
  c: number = 0;
  inc = (v: number = 1) => { this.c += v; };

  get isSynced() {
    return isSynchronized(this)
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'ExampleStore',
  properties: ['c'],
  adapter: storageAdapter,
})(new ExampleStore());

// export default new ExampleStore();