import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useConstants from '../utils/useConstants';

type Props = {
}

const C = useConstants();

const ExampleComponent: React.FC<Props> = ({}) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Example Component</Text>
    </View>
  )
};

const S = StyleSheet.create({});

export default ExampleComponent;