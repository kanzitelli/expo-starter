import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

type LandingScreenProps = StackScreenProps<ScreenProps, 'Landing'>;

const LandingScreen: React.FC<LandingScreenProps> = ({
  navigation,
  route,
}) => {
  // const { param } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.scrollviewContent}
        contentInsetAdjustmentBehavior={'automatic'}
      >
        <Text>Landing</Text>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1,
  },
  scrollviewContent: {
    padding: 16,
  },
});

export default LandingScreen;