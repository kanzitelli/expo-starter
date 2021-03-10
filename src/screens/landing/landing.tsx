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
const HeaderText = styled.Text(p => ({
  fontSize: C.sizes.xxl,
  textAlign: 'center',
  color: p.theme.colors.text,
}));
const ButtonsContainer = styled.View({
  marginVertical: C.sizes.xxl * 3,
});

// Screen
const LandingScreen: React.FC<LandingScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { ui } = useStores();
  const { t } = useServices();

  const openAuth = (am: AuthMethod) => () => /// @ts-ignore
    navigation.navigate('Auth', { screen: 'AuthScreen', params: { method: am } });

  return (
    <ScrollContainer>
      <HeaderText>
        {t.do('landing.welcome')}
      </HeaderText>

      <ButtonsContainer>
        <Button shadow
          title={t.do('buttons.signUp')}
          onPress={openAuth('signup')}
        />
        <Button noBg
          title={t.do('buttons.logIn')}
          onPress={openAuth('login')}
        />

        <Button noBg
          title={t.do('buttons.toggleTheme')}
          onPress={ui.toggleThemeMode}
        />
      </ButtonsContainer>
    </ScrollContainer>
  )
});

export default LandingScreen;