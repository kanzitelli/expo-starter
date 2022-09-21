import React, {useMemo} from 'react';
import {Image} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

import {useAppearance} from '../utils/hooks';
import {randomStr} from '../utils/help';

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
      {/* <FastImage
    style={{width: 120, height: 120, borderRadius: 20}}
    source={{uri: item.image}}
    resizeMode={FastImage.resizeMode.contain}
    /> */}
      <Image
        source={{uri: item.image}}
        style={{width: 120, height: 120, borderRadius: 20}}
        resizeMode="contain"
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
