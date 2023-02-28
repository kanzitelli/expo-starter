import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {NavioSection} from '@app/components/sections/NavioSection';

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
        <NavioSection />
      </ScrollView>
    </View>
  );
});

Example.options = props => ({
  headerBackTitleStyle: false,
  title: `${services.t.do('example.title')} ${(props?.route?.params as Props)?.type ?? ''}`,
});
