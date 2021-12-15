import {stores} from '../../stores';

export class CounterApi {
  get = async (): PVoid => {
    const {counter} = stores;

    counter.setLoading(true);

    try {
      const resp = await fetch('https://cli-rn.batyr.io/api/counter');
      const json: CounterGetResponse = await resp.json();

      counter.set(json.value);
    } catch (e) {
      console.log(e);
    }

    counter.setLoading(false);
  };
}
