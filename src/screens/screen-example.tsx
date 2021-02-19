import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { useStores } from '../stores';
import { useServices } from '../services';
import useConstants from '../utils/useConstants';

type ExampleScreenProps = StackScreenProps<ScreenProps, 'Example'>;

const C = useConstants();

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
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text>Example</Text>
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
    padding: 16,
  },
});

export default ExampleScreen;