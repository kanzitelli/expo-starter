// NAVIGATION
type ScreenProps = {
  Example: undefined;

  // Landing Navigator
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
type SignUpParams = {
  username: string;
  email: string;
  password: string;
}
type LogInParams = {
  email: string;
  password: string;
}