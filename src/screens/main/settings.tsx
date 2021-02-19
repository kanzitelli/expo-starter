import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { useServices } from '../../services';
import { useStores } from '../../stores';

type SettingsScreenProps = StackScreenProps<ScreenProps, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({
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
        <Text>Settings</Text>

        <Pressable onPress={auth.logOut}>
          <Text>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
};

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

export default SettingsScreen;