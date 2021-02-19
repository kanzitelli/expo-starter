import { stores } from '../stores';

class AuthService implements IService {
  init = async () => { }

  signUp = async (params: SignUpParams, extraParams?: any) => {
    stores.G.setIsAuthed(true);
  }

  logIn = async (params: LogInParams) => {
    stores.G.setIsAuthed(true);
  }

  logOut = async () => {
    stores.G.setIsAuthed(false);
  }
}

export default new AuthService();