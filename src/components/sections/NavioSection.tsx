import React from 'react';
import {Text} from 'react-native-ui-lib';
import {useServices} from '../../services';
import {BButton} from '../button';
import {Section} from '../section';
import {randomNum} from '../../utils/help';
import {Row} from '../row';

type Props = {};

export const NavioSection: React.FC<Props> = ({}) => {
  const {t, navio} = useServices();

  // Methods
  const pushScreen = () => navio.push('Example', {type: 'push'});
  const goBack = () => navio.goBack();
  const globalSetRoot = () => navio.setRoot('tabs', 'AppTabs');
  const stacksPush = () => navio.stacks.push('ProductPageStack');
  const stacksSetRoot = () => navio.stacks.setRoot('MainStack');
  const stacksPushWithParams = () =>
    navio.N.navigate('ProductPageStack', {
      screen: 'ProductPage',
      params: {productId: 'product_jf289h'},
    }); // in order to pass params to a stack you will need to use react-navigation instance `navio.N` and using `.navigate()` as you would do using react-navigation.
  const tabsJumpTo = () => navio.tabs.jumpTo('PlaygroundTab');
  const tabsUpdateOptionsBadge = () =>
    navio.tabs.updateOptions('SettingsTab', {tabBarBadge: randomNum()});
  const tabsUpdateOptionsTitle = () =>
    navio.tabs.updateOptions('SettingsTab', {title: `Random ${randomNum()}`});
  const tabsSetRoot = () => navio.tabs.setRoot('AppTabs');
  const drawersToggle = () => navio.drawers.toggle();
  const drawersJumpTo = () => navio.drawers.jumpTo('Playground');
  const drawerUpdateOptions = () => navio.drawers.updateOptions('Main', {title: 'Main (updated)'});
  const drawersSetRoot = () => navio.drawers.setRoot('MainDrawer');
  const modalsShow = () => navio.modals.show('ExampleModal');

  return (
    <Section title={t.do('section.navio.title')}>
      <Text text60R textColor>
        Common
      </Text>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.common.push')}
          onPress={pushScreen}
        />
        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.common.go_back')}
          onPress={goBack}
        />
      </Row>
      <BButton
        marginV-s1
        size="small"
        label={t.do('section.navio.button.common.set_root')}
        onPress={globalSetRoot}
      />

      <Text marginT-s2 text60R textColor>
        Stacks
      </Text>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.stacks.push')}
          onPress={stacksPush}
        />
        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.stacks.set_root')}
          onPress={stacksSetRoot}
        />
      </Row>
      <BButton
        flex
        marginV-s1
        marginR-s1
        size="small"
        label={t.do('section.navio.button.stacks.push_with_params')}
        onPress={stacksPushWithParams}
      />

      <Text marginT-s2 text60R textColor>
        Tabs
      </Text>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.tabs.update_badge_options')}
          onPress={tabsUpdateOptionsBadge}
        />
        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.tabs.update_title_options')}
          onPress={tabsUpdateOptionsTitle}
        />
      </Row>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.tabs.jump_to')}
          onPress={tabsJumpTo}
        />
        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.tabs.set_root')}
          onPress={tabsSetRoot}
        />
      </Row>

      <Text marginT-s2 text60R textColor>
        Drawers
      </Text>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.drawers.toggle')}
          onPress={drawersToggle}
        />
        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.drawers.jump_to')}
          onPress={drawersJumpTo}
        />
      </Row>
      <Row>
        <BButton
          flex
          marginV-s1
          marginR-s1
          size="small"
          label={t.do('section.navio.button.drawers.update_title_options')}
          onPress={drawerUpdateOptions}
        />

        <BButton
          flex
          marginV-s1
          marginL-s1
          size="small"
          label={t.do('section.navio.button.drawers.set_root')}
          onPress={drawersSetRoot}
        />
      </Row>

      <Text marginT-s2 text60R textColor>
        Modals
      </Text>
      <BButton
        marginV-s1
        size="small"
        label={t.do('section.navio.button.modals.show')}
        onPress={modalsShow}
      />
    </Section>
  );
};
