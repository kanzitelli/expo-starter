import {Navio} from 'rn-navio';

import {Main} from './screens/main';
import {Playground} from './screens/playground';
import {Settings} from './screens/settings';
import {Example} from './screens/_screen-sample';

import {useAppearance} from './utils/hooks';
import {
  screenDefaultOptions,
  tabScreenDefaultOptions,
  getTabBarIcon,
  drawerScreenDefaultOptions,
} from './utils/designSystem';
import {services} from './services';

// NAVIO
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
    ProductPage: {
      component: Example,
      options: {
        headerShown: false,
      },
    },
  },
  stacks: {
    MainStack: ['Main', 'Example'],
    ExampleStack: {
      screens: ['Example'],
      navigatorProps: {
        screenListeners: {
          focus: () => {},
        },
      },
    },
    ProductPageStack: {
      screens: ['ProductPage'],
      containerOptions: {
        headerShown: true,
        title: 'Product page',
      },
    },
  },
  tabs: {
    AppTabs: {
      content: {
        MainTab: {
          stack: 'MainStack',
          options: () => ({
            title: 'Main',
            tabBarIcon: getTabBarIcon('MainTab'),
          }),
        },
        PlaygroundTab: {
          stack: ['Playground'],
          options: () => ({
            title: 'Playground',
            tabBarIcon: getTabBarIcon('PlaygroundTab'),
          }),
        },
        SettingsTab: {
          stack: ['Settings'],
          options: () => ({
            title: services.t.do('settings.title'),
            tabBarIcon: getTabBarIcon('SettingsTab'),
          }),
        },
      },
    },
  },
  modals: {
    ExampleModal: 'ExampleStack',
  },
  drawers: {
    MainDrawer: {
      content: {
        Main: 'MainStack',
        Example: 'ExampleStack',
        Playground: ['Playground'],
      },
    },
  },
  root: 'AppTabs',
  hooks: [useAppearance],
  defaultOptions: {
    stacks: {
      screen: screenDefaultOptions,
    },
    tabs: {
      screen: tabScreenDefaultOptions,
    },
    drawers: {
      screen: drawerScreenDefaultOptions,
    },
  },
});

export const getNavio = () => navio;
export const AppRoot = navio.Root;
