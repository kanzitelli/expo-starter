import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScreenProps} from '.';
import {useServices} from '../services';
// import { useStores } from '../stores';
// import { useConstants } from '../utils/constants';

import {Section} from '../components/section';
import {randomNum} from '../utils/help';
import {Reanimated2} from '../components/reanimated2';
import {BButton} from '../components/button';

type Props = NativeStackScreenProps<ScreenProps, 'Example'>;

export const Example: React.FC<Props> = observer(({route}) => {
  const {value} = route.params ?? {value: randomNum()};
  const {nav, t} = useServices();
  // const {} = useStores();
  // const {} = useConstants();

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View padding-s4>
          <Section title={t.do('section.navigation.title')}>
            {!value ? null : (
              <Text textColor text50R>
                Pass prop: {value}
              </Text>
            )}

            <View left>
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
            </View>

            <Reanimated2 stID="reanimated2" />

            <View left marginT-s4>
              <BButton
                marginV-s1
                label={t.do('section.navigation.button.back')}
                onPress={nav.pop}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
});
