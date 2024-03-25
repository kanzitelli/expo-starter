import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useAppearance} from '@app/utils/hooks';
import {randomStr} from '@app/utils/help';
import {FlashList} from '@shopify/flash-list';
import {Image} from 'expo-image';
import {Row} from '@app/components/row';
import formatRelative from 'date-fns/formatRelative';
import subDays from 'date-fns/subDays';

type RowData = {
  key: string;
  title: string;
  image: string;
  description: string;
  pics: string[];
};

export type Props = {};

export const PlaygroundFlashList: NavioScreen<Props> = observer(() => {
  useAppearance(); // for Dark Mode
  // const {ui} = useStores();
  const {navio} = useServices();
  const navigation = navio.useN();

  const DATA: RowData[] = useMemo(
    () =>
      Array.from({length: 1000}).map((v, ndx) => ({
        key: `${ndx}`,
        title: `Item ${ndx}`,
        image: `https://picsum.photos/200?image=${ndx + 1}`,
        description: randomStr(300),
        pics: [
          `https://picsum.photos/200?image=${ndx * 69}`,
          `https://picsum.photos/200?image=${ndx * 99}`,
        ],
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
        renderItem={({item}) => <ListItem item={item} />}
        estimatedItemSize={300}
      />
    </View>
  );
});
PlaygroundFlashList.options = {
  headerBackTitleStyle: false,
  title: `Flash List`,
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const ListItem = ({item}: {item: RowData}) => {
  useAppearance();

  return (
    <View padding-s2 paddingH-s4 paddingB-s8 bg-bgColor>
      <Row>
        <Image
          recyclingKey={`${item.key}${item.image}`}
          source={item.image}
          style={{width: 80, height: 80, borderRadius: 16}}
          placeholder={blurhash}
          contentFit="cover"
          resizeMode="contain"
          transition={100}
        />

        <View>
          <Text textColor text50R marginL-s2>
            {item.title}
          </Text>

          <Text textColor text70R marginL-s2>
            {formatRelative(subDays(new Date(), 3), new Date())}
          </Text>
        </View>
      </Row>

      <View padding-s1 paddingT-s2>
        <Text textColor text70R>
          {item.description}
        </Text>

        <Row>
          {item.pics.map((pic, ndx) => (
            <View key={ndx} flex margin-s1>
              <Image
                style={{height: 140, borderRadius: 8}}
                source={pic}
                placeholder={blurhash}
                contentFit="cover"
                resizeMode="contain"
                transition={100}
              />
            </View>
          ))}
        </Row>
      </View>
    </View>
  );
};
