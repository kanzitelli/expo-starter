import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';

import { useServices } from '../../services';
import { useStores } from '../../stores';

type MainScreenProps = StackScreenProps<ScreenProps, 'Main'>;

const MainScreen: React.FC<MainScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const { G } = useStores();
  const {} = useServices();

  return (
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text>Email: {G.email}</Text>
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
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;