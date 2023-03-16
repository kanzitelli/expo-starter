import React, {useMemo} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {ScrollView} from 'react-native-gesture-handler';
import {Bounceable} from 'rn-bounceable';
import {If} from '@kanzitelli/if-component';

import {useStores} from '@app/stores';
import {useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {Row} from '@app/components/row';
import {Icon} from '@app/components/icon';
import {Section} from '@app/components/section';

type SectionData = {
  content: {
    title: string;
    subtitle?: string;
    icon: string;
    onPress: PureFunc;
  }[];
};

export const Playground: React.FC = observer(() => {
  useAppearance();
  const {navio} = useServices();
  const {auth} = useStores();

  // Methods
  const shopFlashList = () => navio.push('PlaygroundFlashList');
  const shopExpoImage = () => navio.push('PlaygroundExpoImage');

  const showAuthFlow = () => {
    // logging out from previous session
    if (auth.state === 'logged-in') {
      auth.logout();
    } else {
      // we can move `navio.setRoot` inside `auth.logout`
      // but is left here for more clarity and simplicity
      navio.setRoot('stacks', 'AuthFlow');
    }
  };

  // pushing stack will hide tabs on Product Page
  const showProductPage = () => navio.stacks.push('ProductPageStack');

  // Memos
  const SectionsData: Record<string, SectionData> = {
    Libraries: {
      content: [
        {
          title: 'Flash List',
          subtitle: 'by Shopify',
          icon: 'list-outline',
          onPress: shopFlashList,
        },
        {
          title: 'Expo Image',
          subtitle: 'by Expo',
          icon: 'image-outline',
          onPress: shopExpoImage,
        },
      ],
    },
    Navio: {
      content: [
        {
          title: 'Auth flow',
          icon: 'lock-closed-outline',
          subtitle: auth.stateStr,
          onPress: showAuthFlow,
        },
        {
          title: 'Hide tabs',
          icon: 'eye-off-outline',
          subtitle: 'Pushes Product Page w/out tabs',
          onPress: showProductPage,
        },
      ],
    },
  };

  // UI Methods
  const Sections = useMemo(() => {
    const keys = Object.keys(SectionsData) as (keyof typeof SectionsData)[];
    return keys.map(k => {
      const s = SectionsData[k];
      return (
        <Section key={k} title={k}>
          {s.content.map(content => {
            return (
              <View key={content.title} marginV-s1>
                <Bounceable onPress={content.onPress}>
                  <View bg-bg2Color padding-s3 br30>
                    <Row>
                      <Icon name={content.icon} size={34} />

                      <View flex marginH-s3>
                        <Text text60R textColor>
                          {content.title}
                        </Text>

                        {If({
                          _: !!content.subtitle,
                          _then: (
                            <Text text70 grey20>
                              {content.subtitle}
                            </Text>
                          ),
                        })}
                      </View>

                      <Icon name="chevron-forward" />
                    </Row>
                  </View>
                </Bounceable>
              </View>
            );
          })}
        </Section>
      );
    });
  }, [SectionsData]);

  return (
    <View flex bg-bgColor>
      <ScrollView contentInsetAdjustmentBehavior="always">{Sections}</ScrollView>
    </View>
  );
});
