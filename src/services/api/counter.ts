// import {stores} from 'stores';
import {Counter$Get$Response} from '@app/utils/types/api';

export class CounterApi {
  get = async (): Promise<Counter$Get$Response> => {
    const resp = await fetch('https://cli-rn.batyr.io/api/counter');
    const json: Counter$Get$Response = await resp.json();
    return json;
  };
}
