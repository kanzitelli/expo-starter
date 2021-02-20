import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform } from 'react-native';
import { observer, useLocalObservable } from 'mobx-react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import { If } from '@kanzitelli/if-component';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';
import Input from '../../components/Input';

type AuthScreenProps = StackScreenProps<ScreenProps, 'Auth'>;

const C = useConstants();

const AuthScreen: React.FC<AuthScreenProps> = observer(({
  navigation,
  route,
}) => {
  const { method } = route.params;
  const { G } = useStores();
  const { auth } = useServices();

  const state = useLocalObservable(() => ({
    loading: false,
    setLoading(v: boolean) { this.loading = v; },

    method: method,
    setMethod(v: AuthMethod) { this.method = v; },
    toggleMethod() { this.method = this.method === 'login' ? 'signup' : 'login'; _updateNavOptions() },
    actionButtonText() { return this.method === 'login' ? 'Login' : 'Sign Up' },
    toggleButtonText() { return this.method === 'login' ? 'Sign Up' : 'Login' },
    infoText() { return this.method === 'login' ? 'Don\'t have an account?' : 'Already have an account?' }
  }));

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as AuthParams,
    onSubmit: async values => {
      const { email, password } = values;

      if (!email || !password) {
        alert('Please enter some data');
        return;
      }

      state.setLoading(true);
      setTimeout(() => {
        state.setLoading(false);
        _doAuth(state.method, values);
      }, 1000);
    },
  });

  useEffect(() => { start() }, []);

  const start = async () => {
    _updateNavOptions();
    _setNavButtons();
  }

  const _updateNavOptions = () => {
    navigation.setOptions({
      title: state.actionButtonText()
    });
  }

  const _setNavButtons = () => {
    navigation.setOptions({
      headerRight: () => (
        <Button noBg noSpace
          title='Close'
          onPress={navigation.popToTop}
          containerStyle={Platform.OS === 'web' ? { marginRight: C.sizes.l } : {}}
        />
      ),
    });
  }

  const _doAuth = (m: AuthMethod, params: AuthParams) => {
    if (m === 'signup') {
      auth.signUp(params);
    }
    if (m === 'login') {
      auth.logIn(params);
    }
  }

  return (
    <View style={S.container}>
      <ScrollView
        style={S.scrollview}
        contentContainerStyle={S.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <View style={S.contentContainer}>
          <Input
            placeholder='Email'
            value={form.values.email}
            onChangeText={form.handleChange('email')}
            props={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            }}
          />
          <Input
            placeholder='Password'
            value={form.values.password}
            onChangeText={form.handleChange('password')}
            props={{
              secureTextEntry: true,
              autoCapitalize: 'none',
            }}
          />

          <Button shadow
            title={state.actionButtonText()}
            onPress={form.handleSubmit}
            containerStyle={S.actionButton}
          />
          <If _={state.loading}
          _then={<ActivityIndicator />} />

          <View style={S.buttonsContainer}>
            <Text style={S.infoText}>
              { state.infoText() }
            </Text>

            <Button noBg
              title={state.toggleButtonText()}
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