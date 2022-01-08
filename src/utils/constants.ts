import {Dimensions} from 'react-native';

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
    links: {
      github: 'https://github.com/kanzitelli/expo-starter',
      website: 'https://github.com/kanzitelli/expo-starter',
    },
  };
};
