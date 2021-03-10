import React from 'react';
import { Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled from '@emotion/native';

import { useServices } from '../../services';
import { useStores } from '../../stores';
import Button from '../../components/Button';
import useConstants from '../../utils/useConstants';
import { ScrollContainer } from '../../components/Containers';

type SettingsScreenProps = StackScreenProps<ScreenProps, 'Settings'>;

const C = useConstants();

// Components
const ExampleText = styled.Text({
  fontSize: 20,
});

// Screen
const SettingsScreen: React.FC<SettingsScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { ui } = useStores();
  const { auth, t } = useServices();

  const _openGithub = () =>
    Linking.openURL(C.links.github);

  return (
    <ScrollContainer>
      <Button noBg
        title={t.do('buttons.toggleTheme')}
        onPress={ui.toggleThemeMode}
      />

      <Button noBg
        title={t.do('buttons.github')}
        onPress={_openGithub}
      />

      <Button shadow
        title={t.do('buttons.logOut')}
        onPress={auth.logOut}
      />
    </ScrollContainer>
  )
});

export default SettingsScreen;