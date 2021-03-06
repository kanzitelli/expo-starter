import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from '@emotion/native';

import useConstants from '../utils/useConstants';

type ContainerProps = {
  row?: boolean;
}

const C = useConstants();

const S = StyleSheet.create({
  flex1: { flex: 1 },

  scrollviewContent: {
    padding: C.sizes.m,
    paddingTop: C.sizes.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ScrollViewFlex1 = styled(ScrollView)(S.flex1);
const ViewFlex1 = styled.View(S.flex1);

export const ScrollContainer = ({ children }: any) => (
  <ScrollViewFlex1
    contentContainerStyle={S.scrollviewContent}
    contentInsetAdjustmentBehavior={'automatic'}
  >
    { children }
  </ScrollViewFlex1>
)

export const Container = styled(ViewFlex1)<ContainerProps>(p => ({
  flexDirection: p.row ? 'row' : 'column',
}));