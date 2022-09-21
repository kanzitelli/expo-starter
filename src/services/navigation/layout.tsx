import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ModalsInfo, ScreensInfoPartial, TabsInfo} from './types';
import {ModalName, ScreenName, TabName} from '../../screens';
import {useAppearance} from '../../utils/hooks';

export const Stack: React.FC<{screens: ScreensInfoPartial}> = ({screens}) => {
  useAppearance(); // for Dark Mode

  const Stack = createNativeStackNavigator();
  const stackScreens = Object.keys(screens).map(it => {
    const key = it as ScreenName;
    const s = screens[key]!!;
    return <Stack.Screen key={key} name={key} component={s.component} options={s.options} />;
  });

  return <Stack.Navigator>{stackScreens}</Stack.Navigator>;
};

const Tabs: React.FC<{tabs: TabsInfo}> = ({tabs}) => {
  useAppearance(); // for Dark Mode

  const Tabs = createBottomTabNavigator();
  const tabScreens = Object.keys(tabs).map(it => {
    const key = it as TabName;
    const t = tabs[key]!!;
    return <Tabs.Screen key={it} name={key} component={t.component} options={t.options} />;
  });

  return <Tabs.Navigator>{tabScreens}</Tabs.Navigator>;
};

const genModals = ({modals, stack}: {modals: ModalsInfo; stack: any}) =>
  Object.keys(modals).map(it => {
    const key = it as ModalName;
    const m = modals[key]!!;
    return <stack.Screen key={key} name={key} component={m.component} />;
  });

export const Root: React.FC<{
  tabs?: TabsInfo;
  modals?: ModalsInfo;
  screens?: ScreensInfoPartial;
}> = ({modals, tabs, screens}) => {
  const RootStack = createNativeStackNavigator();

  const App = () => (tabs ? <Tabs tabs={tabs} /> : screens ? <Stack screens={screens} /> : null);
  const AppScreen = <RootStack.Screen name="App" component={App} />;

  const ModalScreens = modals ? genModals({modals, stack: RootStack}) : null;

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Group>{AppScreen}</RootStack.Group>

      <RootStack.Group screenOptions={{presentation: 'modal'}}>{ModalScreens}</RootStack.Group>
    </RootStack.Navigator>
  );
};
