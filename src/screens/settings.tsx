import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, SegmentedControl, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {Section} from '@app/components/section';
import {Row} from '@app/components/row';
import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '@app/utils/types/enums';
import {useAppearance} from '@app/utils/hooks';
import {useStores} from '@app/stores';
import {HeaderButton} from '@app/components/button';
import {services, useServices} from '@app/services';

export const Settings: NavioScreen = observer(({}) => {
  useAppearance();
  const {ui} = useStores();
  const {navio} = useServices();
  const navigation = navio.useN();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);

  // Computed
  const unsavedChanges = ui.appearance !== appearance || ui.language !== language;

  const appearanceInitialIndex = appearances.findIndex(it => it === appearance);
  const appearanceSegments = appearancesUI.map(it => ({label: it}));

  const languageInitialIndex = languages.findIndex(it => it === language);
  const languageSegments = languagesUI.map(it => ({label: it}));

  // Start
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        unsavedChanges ? <HeaderButton onPress={handleSave} label="Save" /> : null,
    });
  }, [unsavedChanges, appearance, language]);

  // Methods
  const handleAppearanceIndexChange = (index: number) =>
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
  const handleLanguageIndexChange = (index: number) =>
    setLanguage(languageUIToInternal[languagesUI[index]]);

  const handleSave = () => {
    ui.setMany({
      appearance,
      language,
    });
  };

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Section title={'UI'}>
          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Appearance
                </Text>
              </View>

              <SegmentedControl
                initialIndex={appearanceInitialIndex}
                segments={appearanceSegments}
                backgroundColor={Colors.bgColor}
                activeColor={Colors.primary}
                inactiveColor={Colors.textColor}
                onChangeIndex={handleAppearanceIndexChange}
              />
            </Row>
          </View>

          <View paddingV-s1>
            <Row>
              <View flex>
                <Text textColor text60R>
                  Language
                </Text>
              </View>

              <SegmentedControl
                initialIndex={languageInitialIndex}
                segments={languageSegments}
                backgroundColor={Colors.bgColor}
                activeColor={Colors.primary}
                inactiveColor={Colors.textColor}
                onChangeIndex={handleLanguageIndexChange}
              />
            </Row>
          </View>
        </Section>
      </ScrollView>
    </View>
  );
});
Settings.options = () => ({
  title: services.t.do('settings.title'),
});
