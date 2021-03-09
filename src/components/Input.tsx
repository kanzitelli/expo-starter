import React from 'react';
import {
  TextInputProps,
  TextInput as RNTextInput,
  Platform
} from 'react-native';
import { TextInput as GHTextInput } from 'react-native-gesture-handler';
import styled from '@emotion/native';

import { generateShadow } from '../utils/help';
import useConstants from '../utils/useConstants';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: PureFuncArg<string>;
  props?: TextInputProps;
}

const C = useConstants();
const TextInputOS = Platform.OS === 'web' ? RNTextInput : GHTextInput; // issue only on mobile web browsers

const Container = styled.View({ padding: C.sizes.s, });
const InputContainer = styled.View([
  generateShadow(),
  {
    padding: C.sizes.s,
    paddingVertical: C.sizes.m,
    borderRadius: C.sizes.m,
    backgroundColor: 'white',
  }
]);
const TextInput = styled(TextInputOS)({ fontSize: 18, });

const Input = ({
  placeholder,
  value,
  onChangeText,
  props,
}: Props) => {
  return (
    <Container>
      <InputContainer>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </InputContainer>
    </Container>
  )
}

export default Input;