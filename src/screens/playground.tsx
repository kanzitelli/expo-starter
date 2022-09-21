import React, {useMemo} from 'react';
import {Image} from 'react-native';
// import FastImage from 'react-native-fast-image';
import {Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

const generateListItemDescription = (len: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const Playground: React.FC = observer(() => {
  // const {t} = useServices();
  // const {ui} = useStores();

  const DATA = Array.from({length: 1000}).map((v, ndx) => ({
    title: `Item ${ndx}`,
    image: `https://picsum.photos/200?image=${ndx + 1}`,
    description: generateListItemDescription(300),
  }));

  // State

  // Methods
  // UI Methods
  const ListHeaderBlock = useMemo(() => {
    return (
      <View padding-s2 bg-bgColor>
        <Text text50M textColor>
          FlashList by Shopify
        </Text>
      </View>
    );
  }, []);

  return (
    <View flex bg-bgColor>
      <FlashList
        contentInsetAdjustmentBehavior="always"
        data={DATA}
        renderItem={({item}) => (
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
        )}
        ListHeaderComponent={ListHeaderBlock}
        estimatedItemSize={300}
      />
    </View>
  );
});
