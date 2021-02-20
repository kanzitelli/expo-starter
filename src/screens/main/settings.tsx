import React from 'react';
import { StyleSheet, View, Text, Pressable, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react';

import { useServices } from '../../services';
import { useStores } from '../../stores';
import Button from '../../components/Button';
import useConstants from '../../utils/useConstants';

type SettingsScreenProps = StackScreenProps<ScreenProps, 'Settings'>;

const C = useConstants();

const SettingsScreen: React.FC<SettingsScreenProps> = observer(({
  navigation,
  route,
}) => {
  // const { param } = route.params;
  const {} = useStores();
  const { auth } = useServices();

  const _openGithub = () =>
    Linking.openURL(C.links.github);

  return (
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Button noBg
          title='Github'
          onPress={_openGithub}
        />

        <Button shadow
          title='Logout'
          onPress={auth.logOut}
        />
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

export default SettingsScreen;