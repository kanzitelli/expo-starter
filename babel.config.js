module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // fix for web caused by react-native-reanimated
      // https://github.com/software-mansion/react-native-reanimated/issues/1823#issuecomment-1384307084
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};
