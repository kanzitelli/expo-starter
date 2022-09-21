import {useState} from 'react';
import {useColorScheme} from 'react-native';
import {reaction} from 'mobx';

import {stores} from '../stores';
import {configureDesignSystem} from './designSystem';

// put this hook in any component which you'd like to keep in sync with appearance
// for example, Main screen or list item component
export const useAppearance = () => {
  useColorScheme();

  const {ui} = stores;
  const [appearance, setAppearance] = useState(ui.appearance);
  reaction(
    () => ui.appearance,
    appearance => {
      configureDesignSystem();
      setAppearance(appearance);
    },
  );

  return {value: appearance};
};
