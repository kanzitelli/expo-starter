import * as Font from 'expo-font';
import {IconComponent} from '@app/components/icon';
import {stores} from '@app/stores';

export class OnLaunchService implements IService {
  private inited = false;

  init = async (): PVoid => {
    if (!this.inited) {
      this.incAppLaunches();

      await this.loadAssets();

      this.inited = true;
    }
  };

  private loadAssets = async () => {
    const fonts = [IconComponent.font];

    const fontAssets = fonts.map(font => Font.loadAsync(font));

    await Promise.all([...fontAssets]);
  };

  private incAppLaunches() {
    const {ui} = stores;

    ui.set('appLaunches', ui.appLaunches + 1);
  }
}
