import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';

// Describe your screens here
export type Tabs = 'Main' | 'WIP' | 'Settings';
export type Modal = 'ExampleModal';
export type Screen = 'Main' | 'Example' | 'Settings';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Settings: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'Home',
      ...screenDefaultOptions(),
    }),
  },
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      title: 'Example',
      ...screenDefaultOptions(),
    }),
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      title: 'Settings',
      ...screenDefaultOptions(),
    }),
  },
};
const HomeStack = () => genStackNavigator([screens.Main, screens.Example]);
const ExampleStack = () => genStackNavigator([screens.Example]);
const SettingsStack = () => genStackNavigator([screens.Settings]);
const ExampleModalStack = () => genStackNavigator([screens.Main, screens.Example]);

// Tabs
const tabs: TabScreenLayouts = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
      ...tabBarDefaultOptions('MainNavigator'),
    }),
  },
  WIP: {
    name: 'ExampleNavigator',
    component: ExampleStack,
    options: () => ({
      title: 'WIP',
      ...tabBarDefaultOptions('ExampleNavigator'),
    }),
  },
  Settings: {
    name: 'SettingsNavigator',
    component: SettingsStack,
    options: () => ({
      title: 'Settings',
      ...tabBarDefaultOptions('SettingsNavigator'),
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.WIP, tabs.Settings]);

// Modals
const modals: ModalScreenLayouts = {
  ExampleModal: {
    name: 'ExampleModal',
    component: ExampleModalStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ExampleModal]);
