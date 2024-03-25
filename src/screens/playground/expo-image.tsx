import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {FlashList} from '@shopify/flash-list';
import {Image} from 'expo-image';
import {Bounceable} from 'rn-bounceable';

type TImage = {
  key: string;
  url: string;
};
type Images = TImage[];

export type Props = {};

export const PlaygroundExpoImage: NavioScreen<Props> = observer(() => {
  useAppearance(); // for Dark Mode
  // const {ui} = useStores();
  const {navio} = useServices();
  const navigation = navio.useN();

  const DATA: Images = useMemo(
    () =>
      Array.from({length: 1000}).map((v, index) => ({
        key: `${index}`,
        url: `https://picsum.photos/200?image=${index + 1}`,
      })),
    [],
  );

  // State

  // Methods

  // Start
  useEffect(() => {
    configureUI();
  }, []);

  // UI Methods
  const configureUI = () => {
    navigation.setOptions({});
  };

  // UI Methods

  return (
    <View flex bg-bgColor>
      <FlashList
        contentInsetAdjustmentBehavior="always"
        data={DATA}
        numColumns={2}
        renderItem={({item}) => <ListItem item={item} />}
        estimatedItemSize={300}
      />
    </View>
  );
});
PlaygroundExpoImage.options = {
  headerBackTitleStyle: false,
  title: `Expo Image`,
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const ListItem = ({item}: {item: TImage}) => {
  useAppearance();

  return (
    <View flex bg-bgColor>
      <Bounceable>
        <Image
          recyclingKey={item.key}
          source={item.url}
          style={{height: 320}}
          placeholder={blurhash}
          contentFit="cover"
          resizeMode="contain"
          transition={100}
        />
      </Bounceable>
    </View>
  );
};
