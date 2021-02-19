import React from 'react';
import { View, StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { generateShadow } from '../utils/help';
import useConstants from '../utils/useConstants';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: PureFuncArg<string>;
  props?: TextInputProps;
}

const C = useConstants();

const Input = ({
  placeholder,
  value,
  onChangeText,
  props,
}: Props) => {
  return (
    <View style={S.container}>
      <View style={[generateShadow(), S.inputContainer]}>
        <TextInput
          style={S.textInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
    </View>
  )
}

const S = StyleSheet.create({
  container: {
    padding: C.sizes.s,
  },
  inputContainer: {
    padding: C.sizes.s,
    paddingVertical: C.sizes.m,
    borderRadius: C.sizes.m,
    backgroundColor: 'white'
  },
  textInput: { fontSize: 18, },
});

export default Input;