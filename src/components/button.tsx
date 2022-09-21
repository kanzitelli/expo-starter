import React from 'react';
import {View, Text, MarginModifiers} from 'react-native-ui-lib';
import {Bounceable} from 'rn-bounceable';

type Props = MarginModifiers & {
  label?: string;
  onPress?: PureFunc;
};

export const BButton: React.FC<Props> = ({label, onPress, ...modifiers}) => {
  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <View center bg-primary padding-s4 br40>
          <Text text65M _white>
            {label}
          </Text>
        </View>
      </Bounceable>
    </View>
  );
};

export const HeaderButton: React.FC<Props> = ({label, onPress, ...modifiers}) => {
  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <View center padding-s1 marginH-s1>
          <Text text65M primary>
            {label}
          </Text>
        </View>
      </Bounceable>
    </View>
  );
};
