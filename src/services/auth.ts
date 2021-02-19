import { stores } from '../stores';

class AuthService implements IService {
  init = async () => { }

  signUp = async (params: AuthParams, extraParams?: any) => {
    stores.G.setIsAuthed(true);
    stores.G.setEmail(params.email);
  }

  logIn = async (params: AuthParams) => {
    stores.G.setIsAuthed(true);
    stores.G.setEmail(params.email);
  }

  logOut = async () => {
    stores.G.setIsAuthed(false);
  }
}

export default new AuthService();