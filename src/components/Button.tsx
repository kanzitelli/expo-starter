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
}) => {
  const shadowStyle = shadow ? generateShadow() : {};
  const bgStyle = noBg ? { backgroundColor: 'transparent' } : {};

  return (
    <View style={[S.container, shadowStyle, containerStyle, bgStyle]}>
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