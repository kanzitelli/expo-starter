import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {View, Button, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScreenProps} from '.';
import {useServices} from '../services';
// import { useStores } from '../stores';
// import { useConstants } from '../utils/constants';

import {Section} from '../components/section';
import {randomNum} from '../utils/help';
import {Reanimated2} from '../components/reanimated2';

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
            <View>
              <Button
                marginV-s1
                label={t.do('section.navigation.button.push')}
                onPress={() => nav.push('Example', {value: randomNum()})}
              />
              <Button
                marginV-s1
                label={t.do('section.navigation.button.show')}
                onPress={() => nav.show('ExampleModal')}
              />
              <Button
                marginV-s1
                label={t.do('section.navigation.button.sharedTransition')}
                onPress={() => Alert.alert('future feature: shared transition')}
              />
            </View>

            {!value ? null : (
              <Text textColor center text50R>
                Pass prop: {value}
              </Text>
            )}
          </Section>

          <Reanimated2 stID="reanimated2" />
          <Button marginV-s1 label={t.do('section.navigation.button.back')} onPress={nav.pop} />

          <Text textColor center>
            localized with i18n-js
          </Text>
        </View>
      </ScrollView>
    </View>
  );
});
