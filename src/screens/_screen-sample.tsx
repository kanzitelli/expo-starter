import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {NavioSection} from '@app/components/sections/NavioSection';

export type Params = {
  type?: 'push' | 'show';
  productId?: string;
};

export const Example: NavioScreen = observer(() => {
  useAppearance(); // for Dark Mode
  const {t, navio} = useServices();
  const navigation = navio.useN();
  const params = navio.useParams<Params>();
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
        {/* Product Page example related */}
        {!!params?.productId ? (
          <View margin-s2 marginV-s2 paddingH-s3>
            <Text>ProductId: {params.productId}</Text>
          </View>
        ) : null}

        <NavioSection />
      </ScrollView>
    </View>
  );
});

Example.options = props => ({
  headerBackTitleStyle: false,
  title: `${services.t.do('example.title')} ${(props?.route?.params as Params)?.type ?? ''}`,
});
