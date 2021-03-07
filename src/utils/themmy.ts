import { Theme } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors;
  }
}

// https://theme-ui.com/theme-spec/
const presets: Presets = {
  light: {
    text: '#1e272e',
    background: 'rgb(244,244,244)',
    primary: '#0fbcf9',
    secondary: '#469c57',
    accent: '#fed330',
    muted: '#f6f6f6f',
  },
  dark: {
    text: 'rgb(244,244,244)',
    background: '#1e272e',
    primary: '#0fbcf9',
    secondary: '#469c57',
    accent: '#fed330',
    muted: '#f6f6f6f',
  },
}

export const getTheme = (mode: ThemeMode): Theme => {
  return {
    colors: presets[mode],
  }
}