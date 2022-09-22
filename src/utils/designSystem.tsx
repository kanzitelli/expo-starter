import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {StatusBarStyle} from 'expo-status-bar';
import {reaction} from 'mobx';
import {useState} from 'react';
import {Appearance as RNAppearance, useColorScheme} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';

import {stores} from '../stores';
import {Appearance} from './types/enums';

const colors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  _black: Colors.rgba(20, 20, 20, 1),
  _black2: Colors.rgba(50, 50, 50, 1),
  _white: Colors.rgba(250, 250, 250, 1),
  _white2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<Appearance, ThemeColors> = {
  system: {} as any,
  light: {
    textColor: colors._black,
    bgColor: colors._white,
    bg2Color: colors._white2,
  },
  dark: {
    textColor: colors._white,
    bgColor: colors._black,
    bg2Color: colors._black2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = async (): PVoid => {
  const {ui} = stores;

  setColorsScheme(ui.appearance); // needed here
  if (ui.isAppearanceSystem) {
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

const setColorsScheme = (appearance: Appearance) => {
  if (appearance === 'system') Colors.setScheme('default');
  else Colors.setScheme(appearance);
};

export const getStatusBarStyle = (): StatusBarStyle => {
  const {ui} = stores;

  if (ui.isAppearanceSystem) {
    return 'auto';
  } else {
    switch (ui.appearance) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      default:
        return 'auto';
    }
  }
};

export const getStatusBarBGColor = (): string => {
  const {ui} = stores;
  const appearance = ui.isAppearanceSystem ? RNAppearance.getColorScheme() : ui.appearance;
  return themes[appearance ?? 'light'].bg2Color;
};

export const getNavigationTheme = (): Theme => {
  const {ui} = stores;

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

  const appearance = ui.isAppearanceSystem ? RNAppearance.getColorScheme() : ui.appearance;
  switch (appearance) {
    case 'dark':
      return MyDarkTheme;
    case 'light':
      return MyDefaultTheme;
  }

  return DefaultTheme;
};

export const getHeaderBlurEffect = (): 'regular' | 'light' | 'dark' => {
  const {ui} = stores;

  return ui.isAppearanceSystem ? 'regular' : (ui.appearance as 'light' | 'dark');
};
