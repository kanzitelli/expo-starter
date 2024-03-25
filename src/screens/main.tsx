import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import {If} from '@kanzitelli/if-component';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {Section} from '@app/components/section';
import {BButton, HeaderButton} from '@app/components/button';
import {Reanimated2} from '@app/components/reanimated2';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import {NavioSection} from '@app/components/sections/NavioSection';

export const Main: NavioScreen = observer(({}) => {
  useAppearance();
  const {counter, ui} = useStores();
  const {t, api, navio} = useServices();
  const navigation = navio.useN();

  // State (local)
  const [loading, setLoading] = useState(false);

  // API Methods
  const getCounterValue = useCallback(async () => {
    setLoading(true);
    try {
      const {value} = await api.counter.get();

      counter.set('value', value);
    } catch (e) {
      console.log('[ERROR]', e);
    } finally {
      setLoading(false);
    }
  }, [api.counter, counter]);

  // Methods
  const handleCounterDec = () => counter.set('value', counter.value - 1);
  const handleCounterInc = () => counter.set('value', counter.value + 1);
  const handleCounterReset = () => counter.set('value', 0);

  // Start
  useEffect(() => {
    configureUI();
    getCounterValue();
  }, []);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({
      headerRight: () => (
        <Row>
          <HeaderButton onPress={handleCounterDec} label="Dec" />
          <HeaderButton onPress={handleCounterInc} label="Inc" />
        </Row>
      ),
    });
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <NavioSection />

        <Section title="Expo">
          <Text text60R textColor>
            Session ID: {Constants.sessionId}
          </Text>
          <Text text60R textColor>
            App name: {Application.applicationName}
          </Text>
        </Section>

        <Section title="Reanimated">
          <Reanimated2 />
        </Section>

        <Section title="MobX">
          <View centerV>
            <Text marginB-s2 text60R textColor>
              App launches: {ui.appLaunches}
            </Text>

            <Text marginB-s2 text60R textColor>
              Counter:{' '}
              <If
                _={loading}
                _then={<Text textColor>Loading...</Text>}
                _else={<Text textColor>{counter.value}</Text>}
              />
            </Text>

            <Row>
              <BButton margin-s1 label=" - " onPress={handleCounterDec} />
              <BButton margin-s1 label=" + " onPress={handleCounterInc} />
              <BButton margin-s1 label="reset" onPress={handleCounterReset} />
            </Row>
          </View>
        </Section>

        <Section title="API">
          <BButton margin-s1 label="Update counter value from API" onPress={getCounterValue} />
        </Section>
      </ScrollView>
    </View>
  );
});
Main.options = () => ({
  title: services.t.do('home.title'),
});
