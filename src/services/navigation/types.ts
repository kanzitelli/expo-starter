import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {ModalName, ScreenName, TabName} from '../../screens';

type BaseScreenInfo<Name extends string, OptionsReturn = NativeStackNavigationOptions> = {
  // name: Name;
  component: React.FC<any>;
  options: (props: {route: RouteProp<ParamListBase, Name>; navigation: any}) => OptionsReturn;
  // component: React.FC<NativeStackScreenProps<ScreenProps, Screen>>; // idk why it doesn't work
};

export type ScreenInfo = BaseScreenInfo<ScreenName>;
export type ScreensInfo = Record<ScreenName, ScreenInfo>;

export type ModalInfo = BaseScreenInfo<ModalName>;
export type ModalsInfo = Record<ModalName, ModalInfo>;

export type TabScreenInfo = BaseScreenInfo<TabName, BottomTabNavigationOptions>;
export type TabsInfo = Record<TabName, TabScreenInfo>;

export type GenRootParams = {
  tabs: TabsInfo;
  modals: ModalsInfo;
};
