import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { useStores } from '../../stores';
import { useServices } from '../../services';

type AuthScreenProps = StackScreenProps<ScreenProps, 'Auth'>;

const AuthScreen: React.FC<AuthScreenProps> = observer(({
  navigation,
  route,
}) => {
  const { method } = route.params;
  const { G } = useStores();
  const {} = useServices();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text>Auth method: { method }</Text>
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

export default AuthScreen;