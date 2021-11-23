<p align="center">
  <img src="https://xxx-files.ggc.team/oss/expo-starter/cover.png" width="80%" title="Logo">
</p>

This starter is a collection of libraries and approaches from my personal experience. No hard judgements ✌️

For more information, check out [Why](#why) section.

## Getting Started

#### Quick start with [cli-rn](https://github.com/kanzitelli/cli-rn)

```bash
> npx cli-rn new App
```

In order to change app's name, please make necessary changes in `app.json`.

Try it out w/ Expo Go - https://expo.dev/@kanzitelli/expo-starter.

<details>
<summary>Manual setup</summary>

1. Clone the repo

```bash
> git clone https://github.com/kanzitelli/expo-starter.git App && cd App
```

2. Remove `.git` file (if not planning to contribute)

```bash
> rm -rf .git
```

3. Install packages

```bash
> yarn
```

4. Run it!

```bash
> yarn start
```

</details>

## What's inside

- [Expo SDK 43](https://github.com/expo/expo) - a set of tools and services built around React Native and native platforms.
- [React Navigation (v6)](https://github.com/react-navigation/react-navigation) - routing and navigation for React Native apps.
- [RN UI lib](https://github.com/wix/react-native-ui-lib) - amazing Design System, UI toolset & components library for React Native. Dark Mode is implemented using this library.
- [Reanimated 2](https://github.com/software-mansion/react-native-reanimated) - React Native's Animated library reimplemented.
- [MobX](https://github.com/mobxjs/mobx) - simple, scalable state management, with [mobx-persist-store](https://github.com/quarrant/mobx-persist-store) for persisting your stores.
- ~~AsyncStorage~~ [MMKV](https://github.com/mrousavy/react-native-mmkv) - efficient, small mobile key-value storage framework developed by WeChat. [~30x faster](https://github.com/mrousavy/react-native-mmkv#benchmark) than _AsyncStorage_! Available only within Expo dev clients. Instructions on installation could be found [here](#ready-to-use-expo-config-plugins).

#### Extra helpful libraries

- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler) - native touches and gesture system for React Native.
- [ESLint](https://github.com/eslint/eslint) + [Prettier](https://github.com/prettier/prettier) - keep your code neat and structured.
- [Release It](https://github.com/release-it/release-it) - automate versioning and publishing of your app.
- [Typescript](https://www.typescriptlang.org/) - strict syntactical superset of JavaScript.

#### Useful services/methods

- `navigation` - a service where all navigation configuration takes place in. It simplifies and abstracts the process of registering screens, layouts, etc.
- `translate` - a service that brings easy integration of localization for an app by using [i18n-js](https://github.com/fnando/i18n-js) and [react-native-localize](https://github.com/zoontek/react-native-localize). You can see an example of `en` and `ru` localizations in `Example` screen.
- `onStart` - a service where you can write your own logic when app is launched. For example, you can increment number of `appLaunches` there.
- `configureDesignSystem()` - a method where all settings for an app's design system is taking place. You can customize there colors, schemes, typegraphy, spacings, etc.

https://user-images.githubusercontent.com/4402166/135329411-adb90a0a-c884-4bbb-9f62-33e9adbd3123.MP4

## Advantages

#### Ready-to-use Expo Config Plugins

It gives us ability to build custom dev clients for iOS and Android with pre-installed [react-native-mmvk](https://github.com/mrousavy/react-native-mmkv) and other libraries.

You can find available plugins under `./plugins` folders.

Links to the docs: [Expo Dev Clients](https://docs.expo.dev/clients/getting-started/) and [Expo Config Plugins](https://docs.expo.dev/guides/config-plugins).

<details>
<summary>Instructions for react-native-mmkv</summary>

1. Install [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) (compatible version - 1.3.2):

```bash
> yarn add react-native-mmkv@1.3.2
```

2. Add `"./plugins/withMMKV"` to `expo.plugins` in `app.json` file.
3. Start Expo dev server with for dev client

```bash
> expo start --dev-client
```

4. Run on a simulator or device

```bash
> expo run:ios # add -d to run on device
> expo run:android
```

5. Open `src/stores/_hydration.ts`, uncomment MMKV initialization code and enjoy its perfomance within Expo!

</details>

#### Describe app screens in one place

All setup for your screens takes place in one file `src/screens/index.ts`:

```
type Screen = 'Main' | 'Example' | 'Settings';
type Tabs = 'Main' | 'WIP' | 'Settings';

const screens: ScreenLayouts = {
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'Home',
    }),
  },
  // ...
}

const tabs: TabScreenLayouts = {
  Main: {
    name: 'MainNavigator',
    component: HomeStack,
    options: () => ({
      title: 'Home',
    }),
  },
  // ...
}
```

#### Build layouts with ease

Stack Navigator:

```
const HomeStack = () => genStackNavigator([screens.Main, screens.Example]);
```

Tab Navigator:

```
const TabNavigator = () => genTabNavigator([tabs.Main, tabs.WIP, tabs.Settings]);
```

#### Navigate to other screens with predictability

```
const Screen = ({componentId}) => {
  const {nav} = useServices();

  return (
    <View>
      <Button
        label="Open Settings"
        onPress={() => nav.push('Settings')}
      />
    </View>
  )
}
```

#### Samples for new screens, services, stores and components.

So you have one structure within the project. You can find them in corresponding folders. Just copy&paste it and make the necessary changes.

## Enhancements

There are still some things I would like to add to the starter:

#### General

- [x] Passing props to a screen example
- [x] Constants: add Dimensions
- [x] AsyncStorage stores persisting example
- [ ] Shared transitions — [IjzerenHein/react-navigation-shared-element](https://github.com/IjzerenHein/react-navigation-shared-element)

Feel free to open an issue for suggestions.

## Worth checking

### Other starters

- [rn-starter](https://github.com/kanzitelli/rn-starter) - 🦄 Production-ready starter for React Native App! Powered by cli-rn, React Navigation (v6), RN UI lib, Mobx, Reanimated 2, Dark Mode, Localization, Notifications, Permissions, and much more.
- [rnn-starter](https://github.com/kanzitelli/rnn-starter) - 🤹 Production-ready starter for React Native App! Powered by cli-rn, React Native Navigation, RN UI lib, Mobx, Reanimated 2, Dark Mode, Localization, Notifications, Permissions, and much more.

### Articles

- Expo + React Native Navigation? Yes! - [Medium](https://kanzitelli.medium.com/expo-react-native-navigation-yes-ebda0cbfa4b1), [Dev.to](https://dev.to/kanzitelli/expo-react-native-navigation-1pll)
- cli-rn — making RN app developing experience as smooth as possible - [Medium](https://kanzitelli.medium.com/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-1022aae3a0d3), [Dev.to](https://dev.to/kanzitelli/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-4e98)

### Apps in production

- Wallpapers App - [Twitter](https://twitter.com/kanzitelli/status/1408192827155177472?s=20), [App Store](https://apps.apple.com/app/id878234888)
- Rabbit App. Lite Reddit client - [Github](https://github.com/kanzitelli/rabbit-app), [App Store](https://apps.apple.com/ru/app/rabbit-app-lite-reddit-client/id1535084154), [Google Play](https://play.google.com/store/apps/details?id=io.batyr.rabbitapp)
- Trip Music Radio - [App Store](https://apps.apple.com/ru/app/id1525645826), [Google Play](https://play.google.com/store/apps/details?id=team.ggc.tripmusic)
- App for VK - [App Store](https://apps.apple.com/ru/app/id1067670987)
- Messenger for VK - [App Store](https://apps.apple.com/ru/app/id891605076)
- Christmas Market - [App Store](https://apps.apple.com/ru/app/id1446775875)

## Why

...do we need yet another starter/boilerplate? Well, I work with React Native for more than 3 years and during the time I started having my own project structure which was a good fit for almost all of the delivered apps. Also, I have come up with some custom [useful services/methods](#useful-servicesmethods) which simplify usage of [React Navigation](https://github.com/react-navigation/react-navigation) and other libraries. Check out [Advantages](#advantages) section.

## License

This project is [MIT licensed](/LICENSE.md)
