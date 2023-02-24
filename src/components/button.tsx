import React from 'react';
import {View, Text, MarginModifiers, Modifiers} from 'react-native-ui-lib';
import {Bounceable} from 'rn-bounceable';

type Props = Modifiers.MarginModifiers &
  Modifiers.FlexModifiers & {
    label?: string;
    onPress?: PureFunc;
    size?: 'medium' | 'small';
  };

export const BButton: React.FC<Props> = ({label, onPress, size = 'medium', ...modifiers}) => {
  const textSize = size === 'medium' ? {text65M: true} : {text70: true};

  return (
    <View {...modifiers}>
      <Bounceable onPress={onPress}>
        <View center bg-primary padding-s4 br40>
          <Text _white {...textSize}>
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
