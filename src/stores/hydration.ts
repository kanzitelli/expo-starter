import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from 'mobx-persist-store';

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