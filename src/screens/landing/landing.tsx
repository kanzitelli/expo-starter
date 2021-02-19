import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';

type LandingScreenProps = StackScreenProps<ScreenProps, 'Landing'>;

const C = useConstants();

const LandingScreen: React.FC<LandingScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const {} = useStores();
  const {} = useServices();

  const openAuth = (am: AuthMethod) => () =>
    navigation.navigate('Auth', { screen: 'AuthScreen', params: { method: am } });

  return (
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text style={S.header}>{'Welcome to\nexpo-starter\n🦥'}</Text>

        <View style={S.buttonsContainer}>
          <Button shadow
            title='Sign Up'
            onPress={openAuth('signup')}
          />
          <Button noBg
            title='Login'
            onPress={openAuth('login')}
          />
        </View>
      </ScrollView>
    </View>
  )
});

const S = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1,
  },
  scrollviewContent: {
    padding: C.sizes.m,
    paddingTop: C.sizes.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 32,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginVertical: C.sizes.xxl * 4,
  }
});

export default LandingScreen;