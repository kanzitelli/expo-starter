import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

class NavService implements IService {
  n: React.RefObject<NavigationContainerRef> = React.createRef();
  r: string | undefined;

  init = async () => { }

  toLanding = () => this.to('Landing');
  toAuth = (params?: any) => this.to('Auth', params);
  toMain = () => this.to('Main');

  private to = (screen: keyof ScreenProps, params?: any) => {
    if (!this.n) return;
    
    this.n.current?.navigate(screen, params);
  }

  onReady = () => {
    this.r = this.n.current?.getCurrentRoute()?.name;
  }

  onStateChange = () => {
    const prevName = this.r;
    const currentName = this.n.current?.getCurrentRoute()?.name;

    if (
      (!!prevName && !!currentName) &&
      (prevName !== currentName) &&
      (currentName !== 'Main') // so we don't count Main screen
    ) {
      const params = { to: currentName, from: prevName };

      // send some statistics
      // facebook.event('ScreenOpen', params);
      console.log('onStateChange', params);
    }

    this.r = currentName;
  }
}

export default new NavService();