import React, { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { observer, useLocalObservable } from 'mobx-react';
import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import styled from '@emotion/native';
import { If } from '@kanzitelli/if-component';

import { useStores } from '../../stores';
import { useServices } from '../../services';
import useConstants from '../../utils/useConstants';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ScrollContainer } from '../../components/Containers';

type AuthScreenProps = StackScreenProps<ScreenProps, 'Auth'>;

const C = useConstants();

// Components
const ContentContainer = styled.View({
  width: '75%',
  maxWidth: 600,
  marginVertical: C.sizes.l,
});
const InfoContainer = styled.View({ marginTop: C.sizes.xxl, });
const InfoText = styled.Text({ textAlign: 'center', });

// Screen
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
    <ScrollContainer>
      <ContentContainer>
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
          containerStyle={{ marginVertical: C.sizes.l, }}
        />
        <If _={state.loading}
        _then={<ActivityIndicator />} />

        <InfoContainer>
          <InfoText>
            { state.infoText() }
          </InfoText>

          <Button noBg
            title={state.toggleButtonText()}
            onPress={state.toggleMethod}
            textStyle={{ textDecorationLine: 'underline', }}
          />
        </InfoContainer>
      </ContentContainer>
    </ScrollContainer>
  )
});

export default AuthScreen;