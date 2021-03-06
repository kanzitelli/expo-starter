import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import styled from '@emotion/native';

import { useServices } from '../../services';
import { useStores } from '../../stores';
import useConstants from '../../utils/useConstants';
import { ScrollContainer } from '../../components/Containers';

type MainScreenProps = StackScreenProps<ScreenProps, 'Main'>;

const C = useConstants();

// Components
const EmailText = styled.Text({
  fontSize: C.sizes.l,
});

// Screen
const MainScreen: React.FC<MainScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { G } = useStores();
  const {} = useServices();

  return (
    <ScrollContainer>
      <EmailText>
        Email: {G.email}
      </EmailText>
    </ScrollContainer>
  )
});

export default MainScreen;