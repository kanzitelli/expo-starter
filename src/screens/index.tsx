import pick from 'lodash/pick';

import {Main} from './main';
import {Playground} from './playground';
import {Settings} from './settings';
import {Example, Props as ExampleProps} from './_screen-sample';
import {ModalsInfo, ScreensInfo, TabsInfo} from '../services/navigation/types';
import {Root, Stack} from '../services/navigation/layout';
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
const HomeStack = () => <Stack screens={pick(screens, ['Main', 'Example'])} />;
const PlaygroundStack = () => <Stack screens={pick(screens, ['Playground'])} />;
const SettingsStack = () => <Stack screens={pick(screens, ['Settings'])} />;
const ExampleStack = () => <Stack screens={pick(screens, ['Example'])} />;

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
export const AppRoot: React.FC = () => <Root tabs={tabs} modals={modals} />;
