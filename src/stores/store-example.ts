import { makeAutoObservable } from 'mobx';
import { persistence } from 'mobx-persist-store';
import { storageAdapter } from '../utils/help';

class ExampleStore {
  c: number = 0;
  inc = (v: number = 1) => { this.c += v; };

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