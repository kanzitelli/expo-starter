import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer, useLocalObservable } from 'mobx-react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import { generateShadow } from '../../utils/help';
import Button from '../../components/Button';

type AuthScreenProps = StackScreenProps<ScreenProps, 'Auth'>;

const C = useConstants();

const AuthScreen: React.FC<AuthScreenProps> = observer(({
  navigation,
  route,
}) => {
  const { method } = route.params;
  const { G } = useStores();
  const {} = useServices();

  const state = useLocalObservable(() => ({
    method: method,
    setMethod(m: AuthMethod) { this.method = m; },
    toggleMethod() { this.method = this.method === 'login' ? 'signup' : 'login'; _updateNavOptions() },
    actionButtonText() { return this.method === 'login' ? 'Login' : 'Sign Up' },
    toggleButtonText() { return this.method === 'login' ? 'Sign Up' : 'Login' },
    infoText() { return this.method === 'login' ? 'Don\'t have an account?' : 'Already have an account?' }
  }));

  useEffect(() => { start() }, []);

  const start = async () => {
    _updateNavOptions();
  }

  const _updateNavOptions = () => {
    navigation.setOptions({
      title: state.actionButtonText()
    });
  }

  const Input = () => {
    return (
      <View style={{
        padding: C.sizes.s,
      }}>
        <View style={[generateShadow(), {
          padding: C.sizes.s,
          paddingVertical: C.sizes.m,
          borderRadius: C.sizes.m,
          backgroundColor: 'white'
        }]}>
          <TextInput
            placeholder={'Email'}
            style={{ fontSize: 18, }}
            keyboardType={'email-address'}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <View style={S.contentContainer}>
          <Input />
          <Input />
          <Input />

          <Button shadow
            title={state.actionButtonText()}
            containerStyle={S.actionButton}
          />

          <View style={S.buttonsContainer}>
            <Text style={S.infoText}>
              { state.infoText() }
            </Text>

            <Button noBg
              title={state.actionButtonText()}
              onPress={state.toggleMethod}
              textStyle={S.toggleButtonText}
            />
          </View>
        </View>

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
    padding: C.sizes.m,
    paddingTop: C.sizes.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    width: '75%',
    maxWidth: 600,
    marginVertical: C.sizes.l,
  },
  actionButton: {
    marginVertical: C.sizes.l,
  },
  buttonsContainer: {
    marginTop: C.sizes.xxl,
  },
  infoText: {
    textAlign: 'center',
  },
  toggleButtonText: {
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;