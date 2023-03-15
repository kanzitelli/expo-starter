import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

type AuthState = 'logged-in' | 'logged-out';
export class AuthStore implements IStore {
  state: AuthState = 'logged-out';
  email = '';

  // getters
  get stateStr() {
    return this.state === 'logged-in' ? `Email: ${this.email}\nPress to logout` : 'Press to login';
  }

  // methods
  logout() {
    this.setMany({
      state: 'logged-out',
      email: '',
    });
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: AuthStore.name,
      properties: ['email', 'state'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<AuthStore>>(what: T, value: AuthStore[T]) {
    (this as AuthStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<AuthStore>>(obj: Record<T, AuthStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as AuthStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
