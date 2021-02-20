import { makeAutoObservable } from 'mobx';
import { isSynchronized, persistence } from 'mobx-persist-store';
import { storageAdapter } from './hydration';

class GlobalStore {
  isAuthed: boolean = false;
  setIsAuthed = (v: boolean) => { this.isAuthed = v; }

  email: string = '';
  setEmail = (v: string) => { this.email = v; }

  get isSynced() {
    return isSynchronized(this)
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'GlobalStore',
  properties: ['isAuthed', 'email'],
  adapter: storageAdapter,
})(new GlobalStore());

// export default new GlobalStore();