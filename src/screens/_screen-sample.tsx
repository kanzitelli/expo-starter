import React from 'react';
import {View} from 'react-native-ui-lib';

// import {screens} from '.';
import {useServices} from '../services';
// import {useStores} from '../stores';
import {Section} from '../components/section';
import {BButton} from '../components/button';
import {ScrollView} from 'react-native';

export type Props = {
  type?: 'push' | 'show';
};
export const Example: React.FC<Props> = ({type = 'push'}) => {
  const {nav, t} = useServices();
  // const {ui} = useStores();

  // State

  // Methods
  const push = () => nav.push('Example');
  const show = () => nav.show('ExampleModal');
  const goBack = async () => {
    // if (type === 'push') {
    //   screens.pop(componentId);
    // }
    // if (type === 'show') {
    //   screens.N.dismissAllModals();
    // }
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
};
