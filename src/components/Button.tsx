import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generateShadow } from '../utils/help';
import useConstants from '../utils/useConstants';

type Props = {
  title: string;
  onPress?: PureFunc;
  shadow?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const C = useConstants();

const Button: React.FC<Props> = ({
  title,
  onPress,
  shadow,
  style,
  textStyle,
  containerStyle,
}) => {
  const shadowStyle = shadow ? generateShadow() : {};

  return (
    <View style={[S.container, shadowStyle, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[S.button, style]}>
          <Text style={[S.title, textStyle]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const S = StyleSheet.create({
  container: {},
  button: {
    padding: C.sizes.xs,
    margin: C.sizes.xs,
  },
  title: {
    fontSize: 18,
  },
});

export default Button;