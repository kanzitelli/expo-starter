import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

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

// Styled Components
const ButtonContainer = styled.View(p => ({
  backgroundColor: C.colors.white,
  borderRadius: C.sizes.m,
  marginVertical: C.sizes.xs,
}));
const TitleContainer = styled.View(p => ({
  alignItems: 'center',
  padding: C.sizes.m,
}));
const Title = styled.Text(p => ({
  fontSize: 18,
  color: C.colors.black, // TODO change
}));

// Main Component
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
  const theme = useTheme();

  const shadowStyle = shadow ? generateShadow() : {};
  const bgStyle = noBg ? { backgroundColor: 'transparent' } : {};
  const noSpaceStyle = noSpace ? { margin: 0, padding: 0 } : {};
  const titleNoBgStyle = noBg ? { color: theme.colors.text, } : {};

  return (
    <ButtonContainer style={[shadowStyle, containerStyle, bgStyle, noSpaceStyle]}>
      <TouchableOpacity onPress={onPress}>
        <TitleContainer style={[style, noSpaceStyle]}>
          <Title style={[textStyle, titleNoBgStyle]}>
            {title}
          </Title>
        </TitleContainer>
      </TouchableOpacity>
    </ButtonContainer>
  )
};

export default Button;