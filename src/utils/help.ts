import { Platform, ViewStyle } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from 'mobx-persist-store';

// BASIC
export const generateShadow = (p?: GenerateShadowProps): ViewStyle =>
  Platform.OS === 'android'
    ? { elevation: p?.shadowRadius || 4 }
    : {
      shadowColor: p?.shadowColor || '#123',
      shadowRadius: p?.shadowRadius || 4,
      shadowOpacity: p?.shadowOpacity || 0.2,
      shadowOffset: {
        width: p?.shadowOffsetW || 0,
        height: p?.shadowOffsetH || 0,
      },
    };

// NAVIGATION
export const navBarStyle = (theme: Theme = 'light') => ({
  headerLargeTitle: true,
  headerStyle: {
    backgroundColor: theme === 'light' ? 'white' : 'black',
  },
  headerTintColor: theme === 'light' ? 'black' : 'white',
});

// MOBX HYDRATION
const readStore = (name: string): Promise<any> => {
  return new Promise(async (resolve) => {
    const data: any = await AsyncStorage.getItem(name);
    resolve(JSON.parse(data));
  });
}

const writeStore = (name: string, content: any): Promise<Error | undefined> => {
  return new Promise(async (resolve) => {
    await AsyncStorage.setItem(name, JSON.stringify(content));
    resolve(undefined);
  });
}

export const storageAdapter = new StorageAdapter({
  read: readStore,
  write: writeStore,
});