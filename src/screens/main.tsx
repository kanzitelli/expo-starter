import React, {useCallback, useEffect} from 'react';
import {ScrollView, Alert, ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {If} from '@kanzitelli/if-component';

import {useServices} from '../services';
import {useStores} from '../stores';

import {Section} from '../components/section';
import {Reanimated2} from '../components/reanimated2';
import {randomNum} from '../utils/help';
import {BButton} from '../components/button';

export const Main: React.FC = observer(({}) => {
  const {nav, t, api} = useServices();
  const {counter, ui} = useStores();

  const start = useCallback(async () => {
    try {
      await api.counter.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data :(');
    }
  }, [api.counter]);

  useEffect(() => {
    start();
  }, []);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
          <Section title={t.do('section.navigation.title')}>
            <BButton
              marginV-s1
              label={t.do('section.navigation.button.push')}
              onPress={() => nav.push('Example', {value: randomNum()})}
            />
            <BButton
              marginV-s1
              label={t.do('section.navigation.button.show')}
              onPress={() => nav.show('ExampleModal')}
            />
            <BButton
              marginV-s1
              label={t.do('section.navigation.button.sharedTransition')}
              onPress={() => Alert.alert('future feature: shared transition')}
            />
          </Section>

          <Section title="Reanimated 2">
            <Reanimated2 stID="reanimated2" />
          </Section>

          <Section title="MobX">
            <View centerV>
              <Text marginB-s2 text60R textColor>
                App launches: {ui.appLaunches}
              </Text>
              <Text marginB-s2 text60R textColor>
                Counter:{' '}
                <If
                  _={counter.loading}
                  _then={() => <ActivityIndicator />}
                  _else={<Text>{counter.value}</Text>}
                />
              </Text>
              <BButton margin-s1 label="-" onPress={counter.dec} />
              <BButton margin-s1 label="+" onPress={counter.inc} />
              <BButton margin-s1 label="reset" onPress={counter.reset} />
            </View>
          </Section>

          <Section title="API">
            <BButton margin-s1 label="Update counter value from API" onPress={api.counter.get} />
          </Section>

          <Text textColor center>
            localized with i18n-js
          </Text>
        </View>
      </ScrollView>
    </View>
  );
});
