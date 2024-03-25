import {Navio} from 'rn-navio';

import {Main} from '@app/screens/main';
import {Playground} from '@app/screens/playground';
import {PlaygroundFlashList} from '@app/screens/playground/flash-list';
import {PlaygroundExpoImage} from '@app/screens/playground/expo-image';
import {Settings} from '@app/screens/settings';
import {Example} from '@app/screens/_screen-sample';

import {useAppearance} from '@app/utils/hooks';
import {
  screenDefaultOptions,
  tabScreenDefaultOptions,
  getTabBarIcon,
  drawerScreenDefaultOptions,
} from '@app/utils/designSystem';
import {services} from '@app/services';
import {AuthLogin} from './screens/auth/login';

// NAVIO
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,

    Playground,
    PlaygroundFlashList,
    PlaygroundExpoImage,

    // for .pushStack example
    ProductPage: {
      component: Example,
      options: {
        headerShown: false,
      },
    },

    // for auth flow
    AuthLogin,
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
    PlaygroundStack: {
      screens: ['Playground', 'PlaygroundFlashList', 'PlaygroundExpoImage'],
    },

    // for .pushStack example
    ProductPageStack: {
      screens: ['ProductPage'],
      containerOptions: {
        headerShown: true,
        title: 'Product page',
      },
    },

    // for auth flow
    AuthFlow: ['AuthLogin', 'Example'],
  },
  tabs: {
    // main 3 tabs
    AppTabs: {
      layout: {
        MainTab: {
          stack: 'MainStack',
          options: () => ({
            title: 'Main',
            tabBarIcon: getTabBarIcon('MainTab'),
          }),
        },
        PlaygroundTab: {
          stack: 'PlaygroundStack',
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
            tabBarBadge: 23,
          }),
        },
      },
    },

    // tabs with drawer
    // TabsWithDrawer: {
    //   layout: {
    //     MainTab: {
    //       stack: 'MainStack',
    //       options: () => ({
    //         title: 'Main',
    //         tabBarIcon: getTabBarIcon('MainTab'),
    //       }),
    //     },
    //     PlaygroundTab: {
    //       drawer: 'DrawerForTabs',
    //       options: () => ({
    //         title: 'Playground',
    //         tabBarIcon: getTabBarIcon('PlaygroundTab'),
    //       }),
    //     },
    //   },
    // },
  },
  drawers: {
    // main drawer
    AppDrawer: {
      layout: {
        Main: {
          stack: 'MainStack',
          options: {
            drawerType: 'front',
          },
        },
        Example: {
          stack: ['Example'],
        },
        Playground: {
          stack: 'PlaygroundStack',
        },
        // Tabs: {
        //   tabs: 'TabsWithDrawer',
        // },
      },
    },

    // drawer inside tabs
    // DrawerForTabs: {
    //   layout: {
    //     FlashList: {
    //       stack: ['PlaygroundFlashList'],
    //       options: {
    //         title: 'Flash List',
    //         drawerPosition: 'right',
    //       },
    //     },
    //     ExpoImage: {
    //       stack: ['PlaygroundExpoImage'],
    //       options: {
    //         title: 'Expo Image',
    //         drawerPosition: 'right',
    //       },
    //     },
    //   },
    // },
  },
  modals: {
    ExampleModal: {stack: 'ExampleStack'},
  },
  root: 'tabs.AppTabs',
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
export const NavioApp = navio.App;
