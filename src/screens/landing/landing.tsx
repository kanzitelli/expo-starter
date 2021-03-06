import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled from '@emotion/native';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';
import { ScrollContainer } from '../../components/Containers';

type LandingScreenProps = StackScreenProps<ScreenProps, 'Landing'>;

const C = useConstants();

// Components
const HeaderText = styled.Text({
  fontSize: C.sizes.xxl,
  textAlign: 'center',
});
const ButtonsContainer = styled.View({
  marginVertical: C.sizes.xxl * 3,
});

// Screen
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
    <ScrollContainer>
      <HeaderText>
        {'Welcome to\nexpo-starter\n🦥'}
      </HeaderText>

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
    </ScrollContainer>
  )
});

export default LandingScreen;