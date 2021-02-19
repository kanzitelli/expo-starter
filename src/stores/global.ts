import { makeAutoObservable } from 'mobx';
// import { persistence } from 'mobx-persist-store';
// import { storageAdapter } from '../utils/help';

class GlobalStore {
  isAuthed: boolean = false;

  setIsAuthed = (v: boolean) => {
    this.isAuthed = v;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

// export default persistence({
//   name: 'GlobalStore',
//   properties: ['isAuthed'],
//   adapter: storageAdapter,
// })(new GlobalStore());

export default new GlobalStore();