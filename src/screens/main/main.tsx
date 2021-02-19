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
  const {} = useStores();
  const { auth } = useServices();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text>Main</Text>
      </ScrollView>
    </View>
  )
});

const styles = StyleSheet.create({
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

export default MainScreen;