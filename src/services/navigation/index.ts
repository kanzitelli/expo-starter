import React from 'react';
import {reloadAsync} from 'expo-updates';

import {ModalProps, ScreenProps} from '../../screens';
import {CommonActions, NavigationContainerRef, StackActions} from '@react-navigation/native';

export class Nav implements IService {
  private inited = false;

  n: React.RefObject<NavigationContainerRef<ScreenProps>> = React.createRef();
  r: string | undefined;

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true;
    }
  };

  // on init methods
  onReady = (): void => {
    this.r = this.n.current?.getCurrentRoute()?.name;
  };

  onStateChange = (): void => {
    const prevName = this.r;
    const currentName = this.n.current?.getCurrentRoute()?.name;

    if (!!prevName && !!currentName) {
      const params = {to: currentName, from: prevName};

      // send some statistics
      // facebook.event('ScreenOpen', params);
      // yandex.event('ScreenOpen', params);
      console.log('onStateChange:', JSON.stringify(params, null, 2));
    }

    this.r = currentName;
  };

  restart = async (): PVoid => {
    await reloadAsync();
  };

  // Navigation methods
  push = <T extends keyof ScreenProps>(name: T, passProps?: ScreenProps[T]): void => {
    this.n.current?.dispatch(StackActions.push(name, passProps));
  };

  pop = (): void => {
    this.n.current?.goBack();
  };

  show = <T extends keyof ModalProps>(name: T, passProps?: ScreenProps[T]): void => {
    this.navigate(name, passProps);
  };

  private navigate = <T extends keyof ScreenProps>(name: T, passProps?: ScreenProps[T]): void => {
    this.n.current?.dispatch(
      CommonActions.navigate({
        name,
        params: passProps,
      }),
    );
  };
}
