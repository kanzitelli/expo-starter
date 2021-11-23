import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {Appearance} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';
import {stores} from '../stores';

const colors: DesignSystemColors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  blackish: Colors.rgba(20, 20, 20, 1),
  blackish2: Colors.rgba(50, 50, 50, 1),
  whitish: Colors.rgba(250, 250, 250, 1),
  whitish2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<AppearanceMode, ThemeColors> = {
  light: {
    textColor: colors.blackish,
    bgColor: colors.whitish,
    bg2Color: colors.whitish2,
  },
  dark: {
    textColor: colors.whitish,
    bgColor: colors.blackish,
    bg2Color: colors.blackish2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = (): void => {
  const {ui} = stores;

  if (ui.isSystemAppearance) {
    Colors.loadColors(colors);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({...colors, ...themes[ui.appearance]});
    Colors.loadSchemes({dark: {}, light: {}});
  }

  Typography.loadTypographies({
    section: {fontSize: 26, fontWeight: '600'},
  });
};

export const getThemeStatusBarStyle = (ca?: CurrentAppearance): StatusBarStyle => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return 'light-content';
    case 'light':
      return 'dark-content';
  }
};

export const getThemeStatusBarBGColor = (ca?: CurrentAppearance): string => {
  return Colors.bg2Color;
};

export const getNavigationTheme = (ca?: CurrentAppearance): Theme => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  // for more information - https://reactnavigation.org/docs/themes
  const MyDefaultTheme: Theme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const MyDarkTheme: Theme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return MyDarkTheme;
    case 'light':
      return MyDefaultTheme;
  }

  return DefaultTheme;
};

export const getHeaderBlurEffect = (ca?: CurrentAppearance): 'regular' | 'light' | 'dark' => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  return current.system ? 'regular' : current.value;
};
