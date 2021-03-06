import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StackScreenProps } from '@react-navigation/stack';

import { useStores } from '../stores';
import { useServices } from '../services';
import useConstants from '../utils/useConstants';
import { ScrollContainer } from '../components/Containers';
import styled from '@emotion/native';

type ExampleScreenProps = StackScreenProps<ScreenProps, 'Example'>;

const C = useConstants();

// Components
const ExampleText = styled.Text({
  fontSize: 20,
  margin: C.sizes.s,
});

// Screen
const ExampleScreen: React.FC<ExampleScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { G } = useStores();
  const {} = useServices();

  useEffect(() => { start() }, []);

  const start = async () => { }

  return (
    <ScrollContainer>
      <ExampleText>
        Example
      </ExampleText>
    </ScrollContainer>
  )
});

export default ExampleScreen;