import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled, { css } from '@emotion/native';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';

type LandingScreenProps = StackScreenProps<ScreenProps, 'Landing'>;

const C = useConstants();

const HeaderText = styled.Text({
  fontSize: C.sizes.xxl,
  textAlign: 'center',
});
const ButtonsContainer = styled.View({
  marginVertical: C.sizes.xxl * 3,
});
const Container = styled(ScrollView)({
  flex: 1,
})

const LandingScreen: React.FC<LandingScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const {} = useStores();
  const {} = useServices();

  const openAuth = (am: AuthMethod) => () => /// @ts-ignore
    navigation.navigate('Auth', { screen: 'AuthScreen', params: { method: am } });

  return (
    <Container
      contentContainerStyle={S.scrollviewContent}
      contentInsetAdjustmentBehavior={'automatic'}
    >
      <HeaderText>{'Welcome to\nexpo-starter\n🦥'}</HeaderText>

      <ButtonsContainer>
        <Button shadow
          title='Sign Up'
          onPress={openAuth('signup')}
        />
        <Button noBg
          title='Login'
          onPress={openAuth('login')}
        />
      </ButtonsContainer>
    </Container>
  )
});

const S = StyleSheet.create({
  scrollviewContent: {
    padding: C.sizes.m,
    paddingTop: C.sizes.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;