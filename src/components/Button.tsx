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
  noBg?: boolean;
  noSpace?: boolean;
}

const C = useConstants();

const Button: React.FC<Props> = ({
  title,
  onPress,
  shadow,
  style,
  textStyle,
  containerStyle,
  noBg,
  noSpace,
}) => {
  const shadowStyle = shadow ? generateShadow() : {};
  const bgStyle = noBg ? { backgroundColor: 'transparent' } : {};
  const noSpaceStyle = noSpace ? { margin: 0, padding: 0 } : {};

  return (
    <View style={[S.container, shadowStyle, containerStyle, bgStyle, noSpaceStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[S.button, style, noSpaceStyle]}>
          <Text style={[S.title, textStyle]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const S = StyleSheet.create({
  container: {
    backgroundColor: C.colors.white,
    borderRadius: C.sizes.m,
    marginVertical: C.sizes.xs,
  },
  button: {
    alignItems: 'center',
    padding: C.sizes.m,
  },
  title: {
    fontSize: 18,
  },
});

export default Button;