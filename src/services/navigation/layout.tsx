import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ModalsInfoPartial, ScreensInfoPartial, TabsInfoPartial} from './types';
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

export const Tabs: React.FC<{tabs: TabsInfoPartial}> = ({tabs}) => {
  useAppearance(); // for Dark Mode

  const Tabs = createBottomTabNavigator();
  const tabScreens = Object.keys(tabs).map(it => {
    const key = it as TabName;
    const t = tabs[key]!!;
    return <Tabs.Screen key={it} name={key} component={t.component} options={t.options} />;
  });

  return <Tabs.Navigator>{tabScreens}</Tabs.Navigator>;
};

const genModals = ({modals, stack}: {modals: ModalsInfoPartial; stack: any}) =>
  Object.keys(modals).map(it => {
    const key = it as ModalName;
    const m = modals[key]!!;
    return <stack.Screen key={key} name={key} component={m.component} />;
  });

// Root takes 3 props.
// If `tabs` is passed, it will be used to set up App layout.
// Otherwise `screens` must be provided.
export const Root: React.FC<{
  tabs?: TabsInfoPartial;
  modals?: ModalsInfoPartial;
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
