import React from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';

import {useServices} from '../services';
// import {useStores} from '../stores';
import {Section} from '../components/section';
import {BButton} from '../components/button';
import {useAppearance} from '../utils/hooks';

export type Props = {
  type?: 'push' | 'show';
};
export const Example: React.FC<Props> = observer(({type = 'push'}) => {
  useAppearance(); // for Dark Mode
  const {nav, t} = useServices();
  // const {ui} = useStores();

  // State

  // Methods
  const push = () => nav.push('Example');
  const show = () => nav.show('ExampleModal');
  const goBack = async () => {
    nav.pop();
  };

  // UI Methods

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Section title={t.do('section.navigation.title')}>
          <BButton marginV-s1 label={t.do('section.navigation.button.push')} onPress={push} />
          <BButton marginV-s1 label={t.do('section.navigation.button.show')} onPress={show} />
          <BButton marginV-s1 label={t.do('section.navigation.button.back')} onPress={goBack} />
        </Section>
      </ScrollView>
    </View>
  );
});
