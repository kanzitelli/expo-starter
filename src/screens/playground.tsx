import React, {useMemo} from 'react';
import {Image} from 'expo-image';
import {Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

import {useAppearance} from '../utils/hooks';
import {randomStr} from '../utils/help';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const Playground: React.FC = observer(() => {
  useAppearance();
  // const {t} = useServices();
  // const {ui} = useStores();

  const DATA = useMemo(
    () =>
      Array.from({length: 1000}).map((v, ndx) => ({
        title: `Item ${ndx}`,
        image: `https://picsum.photos/200?image=${ndx + 1}`,
        description: randomStr(300),
      })),
    [],
  );

  // State

  // Methods
  // UI Methods

  return (
    <View flex bg-bgColor>
      <FlashList
        contentInsetAdjustmentBehavior="always"
        data={DATA}
        renderItem={({item}) => <ListItem item={item} />}
        ListHeaderComponent={ListHeader}
        estimatedItemSize={300}
      />
    </View>
  );
});

const ListItem = ({item}: any) => {
  useAppearance();

  return (
    <View padding-s2 bg-bgColor>
      <Image
        style={{width: 120, height: 120, borderRadius: 20}}
        source={item.image}
        placeholder={blurhash}
        contentFit="cover"
        resizeMode="contain"
        transition={100}
      />

      <Text textColor text50R>
        {item.title}
      </Text>

      <Text textColor text70R>
        {item.description}
      </Text>
    </View>
  );
};

const ListHeader = () => {
  useAppearance();

  return (
    <View padding-s2 bg-bgColor>
      <Text text50M textColor>
        FlashList by Shopify
      </Text>
    </View>
  );
};
