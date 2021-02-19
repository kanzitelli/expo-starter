// NAVIGATION
type ScreenProps = {
  Example: undefined;

  // Landing Navigator
  Auth: { method: AuthMethod };
  Landing: undefined;

  // Main Navigator
  Main: undefined;
  Settings: undefined;
}

type NavigatorProps = {
  theme?: Theme;
}
type AppStackProps = {
  authed: boolean;
}

// BASIC
type PureFunc = () => void;
type PureFuncArg<T> = (arg: T) => void;
type AuthMethod = 'login' | 'signup'

// HELP METHODS
type GenerateShadowProps = {
  shadowColor?: string;
  shadowRadius?: number;
  shadowOpacity?: number;
  shadowOffsetW?: number;
  shadowOffsetH?: number;
}

interface IService {
  init: () => Promise<void>;
}

// STORES
type Theme = 'light' | 'dark'

// API
// Auth Service
type AuthParams = {
  email: string;
  password: string;
}