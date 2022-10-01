import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '../services';
// import {useStores} from '../stores';
import {Section} from '../components/section';
import {BButton} from '../components/button';
import {useAppearance} from '../utils/hooks';

export type Props = {
  type?: 'push';
};

export const Example: NavioScreen<Props> = observer(({type = 'push'}) => {
  useAppearance(); // for Dark Mode
  const navigation = useNavigation();
  const {t, navio} = useServices();
  // const {ui} = useStores();

  // State

  // Methods
  const push = () => navio.push('Example', {type: 'push'});
  const pushStack = () => navio.pushStack('ExampleStack');
  const jumpTo = () => navio.jumpTo('PlaygroundTab');
  const show = () => navio.show('ExampleModal');
  const setRoot = () => navio.setRoot('Tabs');
  const goBack = () => navio.pop();

  // Start
  useEffect(() => {
    configureUI();
  }, []);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({});
  };

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Section title={t.do('section.navio.title')}>
          <BButton marginV-s1 label={t.do('section.navio.button.push')} onPress={push} />
          <BButton marginV-s1 label={t.do('section.navio.button.push_stack')} onPress={pushStack} />
          <BButton marginV-s1 label={t.do('section.navio.button.jump_to')} onPress={jumpTo} />
          <BButton marginV-s1 label={t.do('section.navio.button.show')} onPress={show} />
          <BButton marginV-s1 label={t.do('section.navio.button.back')} onPress={goBack} />
          <BButton marginV-s1 label={'Set Root - Tabs'} onPress={setRoot} />
        </Section>
      </ScrollView>
    </View>
  );
});

Example.options = props => ({
  headerBackTitleStyle: false,
  title: `${services.t.do('example.title')} ${(props?.route?.params as Props)?.type ?? ''}`,
});
