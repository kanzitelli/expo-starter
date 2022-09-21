import pick from 'lodash/pick';

import {ModalsInfo, ScreensInfo, TabsInfo} from '../services/navigation/types';
import {Main} from './main';
import {Playground} from './playground';
import {Settings} from './settings';
import {Example, Props as ExampleProps} from './_screen-sample';
import {genRoot, genStack} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';

// Props
type ScreenProps = {
  Main: undefined;
  Playground: undefined;
  Settings: undefined;
  Example: ExampleProps;
};
type ModalProps = {
  ExampleModal: undefined;
};
type TabProps = {
  MainTab: undefined;
  PlaygroundTab: undefined;
  SettingsTab: undefined;
};
export type ScreenAndModalProps = ModalProps & ScreenProps;

export type ScreenName = keyof ScreenProps;
export type ModalName = keyof ModalProps;
export type TabName = keyof TabProps;

// Screens
const screens: ScreensInfo = {
  Main: {
    component: Main,
    options: () => ({
      title: 'Home',
      ...screenDefaultOptions(),
    }),
  },
  Playground: {
    component: Playground,
    options: () => ({
      title: 'Playground',
      ...screenDefaultOptions(),
    }),
  },
  Settings: {
    component: Settings,
    options: () => ({
      title: 'Settings',
      ...screenDefaultOptions(),
    }),
  },
  Example: {
    component: Example,
    options: () => ({
      title: 'Example',
      ...screenDefaultOptions(),
    }),
  },
};
const HomeStack = () => genStack(pick(screens, ['Main', 'Example']));
const PlaygroundStack = () => genStack(pick(screens, ['Playground']));
const SettingsStack = () => genStack(pick(screens, ['Settings']));
const ExampleStack = () => genStack(pick(screens, ['Example']));

// Tabs
const tabs: TabsInfo = {
  MainTab: {
    component: HomeStack,
    options: () => ({
      title: 'Home',
      ...tabBarDefaultOptions('MainTab'),
    }),
  },
  PlaygroundTab: {
    component: PlaygroundStack,
    options: () => ({
      title: 'Playground',
      ...tabBarDefaultOptions('PlaygroundTab'),
    }),
  },
  SettingsTab: {
    component: SettingsStack,
    options: () => ({
      title: 'Settings',
      ...tabBarDefaultOptions('SettingsTab'),
    }),
  },
};

// Modals
const modals: ModalsInfo = {
  ExampleModal: {
    component: ExampleStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root
export const Root = (): JSX.Element => genRoot({tabs, modals});
