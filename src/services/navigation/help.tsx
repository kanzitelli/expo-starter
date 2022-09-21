import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GenRootParams, ModalsInfo, ScreensInfo, TabsInfo} from './types';
import {ModalName, ScreenName, TabName} from '../../screens';

export const genStack = (screens: Partial<ScreensInfo>): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change nav bar appearance

  const Stack = createNativeStackNavigator();
  const stackScreens = Object.keys(screens).map(it => {
    const key = it as ScreenName;
    const s = screens[key]!!;
    return <Stack.Screen key={key} name={key} component={s.component} options={s.options} />;
  });

  return <Stack.Navigator>{stackScreens}</Stack.Navigator>;
};

const genTabs = (tabs: TabsInfo): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change tab bar appearance

  const Tabs = createBottomTabNavigator();
  const tabScreens = Object.keys(tabs).map(it => {
    const key = it as TabName;
    const t = tabs[key]!!;
    return <Tabs.Screen key={it} name={key} component={t.component} options={t.options} />;
  });

  return <Tabs.Navigator>{tabScreens}</Tabs.Navigator>;
};

const genModals = (modals: ModalsInfo, stack: any) =>
  Object.keys(modals).map(it => {
    const key = it as ModalName;
    const m = modals[key]!!;
    return <stack.Screen key={key} name={key} component={m.component} />;
  });

export const genRoot = (params: GenRootParams): JSX.Element => {
  const {modals, tabs} = params;

  const RootStack = createNativeStackNavigator();
  const App = () => genTabs(tabs);
  const AppScreen = <RootStack.Screen name="App" component={App} />;
  const ModalScreens = genModals(modals, RootStack);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Group>{AppScreen}</RootStack.Group>

      <RootStack.Group screenOptions={{presentation: 'modal'}}>{ModalScreens}</RootStack.Group>
    </RootStack.Navigator>
  );
};
