import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import {If} from '@kanzitelli/if-component';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '../services';
import {useStores} from '../stores';
import {Section} from '../components/section';
import {BButton, HeaderButton} from '../components/button';
import {Reanimated2} from '../components/reanimated2';
import {Row} from '../components/row';
import {useAppearance} from '../utils/hooks';

export const Main: NavioScreen = observer(({}) => {
  useAppearance();
  const navigation = useNavigation();
  const {counter, ui} = useStores();
  const {t, api, navio} = useServices();

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
  const push = () => navio.push('Example', {type: 'push'});
  const pushStack = () => navio.pushStack('ExampleStack');
  const jumpTo = () => navio.jumpTo('PlaygroundTab');
  const show = () => navio.show('ExampleModal');
  const setRoot = () => navio.setRoot('ExampleStack');

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
        <Section title="Expo">
          <Text text60R textColor>
            Session ID: {Constants.sessionId}
          </Text>
          <Text text60R textColor>
            App name: {Application.applicationName}
          </Text>
        </Section>

        <Section title={t.do('section.navio.title')}>
          <BButton marginV-s1 label={t.do('section.navio.button.push')} onPress={push} />
          <BButton marginV-s1 label={t.do('section.navio.button.push_stack')} onPress={pushStack} />
          <BButton marginV-s1 label={t.do('section.navio.button.jump_to')} onPress={jumpTo} />
          <BButton marginV-s1 label={t.do('section.navio.button.show')} onPress={show} />
          <BButton marginV-s1 label={'Set Root - Stack'} onPress={setRoot} />
        </Section>

        <Section title="Reanimated 2">
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
