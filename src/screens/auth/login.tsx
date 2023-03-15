import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {View, Text, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';

import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {BButton} from '@app/components/button';

export type Props = {
  type?: 'push';
};

export const AuthLogin: NavioScreen<Props> = observer(({type = 'push'}) => {
  useAppearance(); // for Dark Mode
  const {t, navio, api} = useServices();
  const {auth} = useStores();

  // State
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  // Start
  useEffect(() => {
    configureUI();
  }, []);

  // API Methods
  const login = async () => {
    setLoading(true);

    try {
      const {status} = await api.auth.login(); // fake login

      if (status === 'success') {
        // marking that we are logged in
        auth.set('state', 'logged-in');

        // navigating to main app
        navio.setRoot('tabs', 'AppTabs');
      }
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  // Methods
  const configureUI = () => {};

  const setEmail = (v: string) => auth.set('email', v);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View>
          <View flex centerH marginT-30>
            <Text text50>Login</Text>

            <Text grey30 marginT-4>
              just fill in any credentials
            </Text>
          </View>

          <View marginT-s6 centerH>
            <View
              paddingH-s4
              marginV-s10
              style={{width: 300, borderWidth: 1, borderColor: Colors.grey50, borderRadius: 12}}
            >
              <View paddingH-s3 paddingV-s2 marginV-s4>
                <TextInput
                  placeholder={'Email'}
                  value={auth.email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  inputMode="email"
                />
              </View>

              <View centerH>
                <View height={1} bg-grey50 style={{width: '100%'}} />
              </View>

              <View paddingH-s3 paddingV-s2 marginV-s4>
                <TextInput
                  placeholder={'Password'}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="visible-password"
                  secureTextEntry
                />
              </View>
            </View>

            <BButton label={loading ? 'Logging in ...' : 'Login'} onPress={login} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
});
AuthLogin.options = props => ({
  title: `Auth flow`,
});
