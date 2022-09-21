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
    const s = screens[it as ScreenName]!!;
    return (
      <Stack.Screen key={it} name={it as ScreenName} component={s.component} options={s.options} />
    );
  });

  return <Stack.Navigator>{stackScreens}</Stack.Navigator>;
};

const genTabs = (tabs: TabsInfo): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change tab bar appearance

  const Tabs = createBottomTabNavigator();
  const tabScreens = Object.keys(tabs).map(it => (
    <Tabs.Screen
      key={it}
      name={it as TabName}
      component={tabs[it as TabName].component}
      options={tabs[it as TabName].options}
    />
  ));

  return <Tabs.Navigator>{tabScreens}</Tabs.Navigator>;
};

const genModals = (modals: ModalsInfo, stack: any) =>
  Object.keys(modals).map(it => (
    <stack.Screen key={it} name={it} component={modals[it as ModalName].component} />
  ));

export const genRoot = (params: GenRootParams): JSX.Element => {
  const {modals, tabs} = params;

  const RootStack = createNativeStackNavigator();
  const app = () => genTabs(tabs);
  const appScreen = <RootStack.Screen name="App" component={app} />;
  const modalScreens = genModals(modals, RootStack);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Group>{appScreen}</RootStack.Group>

      <RootStack.Group screenOptions={{presentation: 'modal'}}>{modalScreens}</RootStack.Group>
    </RootStack.Navigator>
  );
};
