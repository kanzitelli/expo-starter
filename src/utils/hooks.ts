import {useState} from 'react';
import {useColorScheme} from 'react-native';
import {reaction} from 'mobx';

import {stores} from '@app/stores';
import {services} from '@app/services';
import {configureDesignSystem} from '@app/utils/designSystem';

// put this hook into any component which you'd like to keep in sync with appearance
// for example, Main screen or list item component
export const useAppearance = () => {
  useColorScheme();

  const {ui} = stores;
  const {t} = services;

  const [appearance, setAppearance] = useState(ui.appearance);
  const [lang, setLang] = useState(ui.language);

  reaction(
    () => ui.appearance,
    appearance => {
      configureDesignSystem();
      setAppearance(appearance);
    },
  );
  reaction(
    () => ui.language,
    language => {
      t.setup();
      setLang(language);
    },
  );

  return {appearance, lang};
};
