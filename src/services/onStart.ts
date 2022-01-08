import * as Font from 'expo-font';
import {IconComponent} from '../components/icon';
import {stores} from '../stores';

const {ui} = stores;

export class OnStart implements IService {
  private inited = false;

  init = async (): PVoid => {
    if (!this.inited) {
      ui.incAppLaunces();

      await this.loadAssets();

      this.inited = true;
    }
  };

  private loadAssets = async () => {
    const fonts = [IconComponent.font];

    const fontAssets = fonts.map(font => Font.loadAsync(font));

    await Promise.all([...fontAssets]);
  };
}
