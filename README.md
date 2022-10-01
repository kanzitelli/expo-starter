<p align="center">
  <img src="https://xxx-files.ggc.team/oss/expo-starter/cover.png" width="80%" title="Logo">
</p>

This starter is a collection of libraries and approaches needed for fast start and productive maintainance of Expo (React Native) App.

## Getting Started

#### Quick start with [cli-rn](https://github.com/kanzitelli/cli-rn)

```bash
npx cli-rn new app
```

In order to change app's name, please make necessary changes in `app.json`.

<details>
<summary>Manual setup</summary>

1. Clone the repo

```bash
npx degit kanzitelli/expo-starter app
```

2. Install packages

```bash
cd app && yarn
```

3. Run it!

```bash
yarn start
```

</details>

## What's inside

- [Expo SDK](https://github.com/expo/expo) - a set of tools and services built around React Native and native platforms.
- [React Navigation (v6)](https://github.com/react-navigation/react-navigation) - routing and navigation for React Native apps.
- [Navio](https://github.com/kanzitelli/rn-navio) - universal navigation library for React Native. Built on top of [React Navigation](https://github.com/react-navigation/react-navigation).
- [RN UI lib](https://github.com/wix/react-native-ui-lib) - amazing Design System, UI toolset & components library for React Native. Dark Mode is implemented using this library.
- [Reanimated 2](https://github.com/software-mansion/react-native-reanimated) - React Native's Animated library reimplemented.
- [MobX](https://github.com/mobxjs/mobx) - simple, scalable state management, with [mobx-persist-store](https://github.com/quarrant/mobx-persist-store) for persisting your stores.
- [Flash List](https://github.com/Shopify/flash-list) - a better list for React Native (by Shopify).
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler) - native touches and gesture system for React Native.

#### Native libraries

In order to use them, you will need to run `yarn prebuild` command to generate `ios/` and `android/` folders with native code.

- [MMKV](https://github.com/mrousavy/react-native-mmkv) - efficient, small mobile key-value storage framework developed by WeChat. [~30x faster](https://github.com/mrousavy/react-native-mmkv#benchmark) than _AsyncStorage_! Available only within Expo dev clients. Instructions on installation could be found [here](https://github.com/mrousavy/react-native-mmkv#expo).
- [Fast Image](https://github.com/DylanVann/react-native-fast-image) - performant React Native image component.

#### Extra helpful libraries

- [Release It](https://github.com/release-it/release-it) - automate versioning and publishing of your app.

#### Useful services/methods

- `navio` - a service that exposes all navigation methods of [Navio](https://github.com/kanzitelli/rn-navio) instance.
- `translate` - a service that brings an easy integration of localization for an app by using [i18n-js](https://github.com/fnando/i18n-js) and [expo-localization](https://github.com/expo/expo/tree/master/packages/expo-localization).
- `api` - a service where API-related methods are located.
- `onStart` - a service where you can write your own logic when app is launched. For example, you can increment number of `appLaunches` there.

#### Design system

This starter is using [RN UI lib](https://github.com/wix/react-native-ui-lib) as a design system, UI toolset and a source of ready-to-go components.

`configureDesignSystem()` - a method where all settings for an app's design system is taking place. You can customize colors, schemes, typegraphy, spacings, etc. Located at `src/utils/designSystem.tsx`.

https://user-images.githubusercontent.com/4402166/191781571-57749464-982b-4d36-b3bc-b97ce4ace705.MP4

## Advantages

#### Describe app layout in one place (w/ [Navio](https://github.com/kanzitelli/rn-navio))

All setup for your screens, tabs and modals take place in one file `src/screens/index.ts`.

```tsx
import {Navio} from 'rn-navio';

// importing screen components
import {Main} from './main';
import {Playground} from './playground';
import {Settings} from './settings';
import {Example} from './_screen-sample';

// building layout
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
  },
  stacks: {
    MainStack: ['Main', 'Example'],
    ExampleStack: ['Example'],
  },
  tabs: {
    MainTab: {
      stack: 'MainStack',
      options: {
        title: 'Home',
      },
    },
    PlaygroundTab: {
      stack: ['Playground'],
      options: () => ({
        title: 'Playground',
      }),
    },
    SettingsTab: {
      stack: ['Settings'],
      options: () => ({
        title: 'Settings',
      }),
    },
  },
  modals: {
    ExampleModal: 'ExampleStack',
  },
  root: 'Tabs',
  hooks: [useAppearance],
  options: {
    stack: screenDefaultOptions,
    tab: tabDefaultOptions,
  },
});

export const AppRoot = navio.Root;
```

#### Navigate with predictability

```tsx
export const Screen = () => {
  const {navio} = useServices();

  return (
    <View>
      <Button
        label="Push Settings"
        onPress={() => {
          // Typescript and IDE will help with autocompletion
          navio.push('Settings');
        }}
      />
    </View>
  );
};
```

#### Dark mode support

You can define modes in `utils/designSystem.tsx`.

#### Samples for new screens, services, stores and components.

So you have one structure within the project. You can find them in corresponding folders. Just copy&paste it and make the necessary changes.

## Enhancements

There are still some things I would like to add to the starter:

- [x] Auth flow [example](https://github.com/kanzitelli/expo-starter/issues/14#issuecomment-1020730141)
- [x] [Navigation library](https://github.com/kanzitelli/rn-navio) to reduce boilerplate code.
- [ ] Shared transitions

Feel free to open an issue for suggestions.

## Worth checking

### Other starters

- [rnn-starter](https://github.com/kanzitelli/rnn-starter) - 🤹 Production-ready starter for React Native App! Powered by cli-rn, React Native Navigation, RN UI lib, Mobx, Reanimated 2, Dark Mode, Localization, Notifications, Permissions, and much more.
- [rn-starter](https://github.com/kanzitelli/rn-starter) - 🦄 Production-ready starter for React Native App! Powered by cli-rn, React Navigation (v6), RN UI lib, Mobx, Reanimated 2, Dark Mode, Localization, Notifications, Permissions, and much more.

> Icons have been generated with [BuildIcon](https://buildicon.netlify.app) created by [Evan Bacon](https://github.com/EvanBacon).

### Articles

- "Build React Native Apps with Simplified and Predictable Navigation" - [Medium](https://kanzitelli.medium.com/build-react-native-apps-with-simplified-and-predictable-navigation-2859f047f29e), [Dev.to](https://dev.to/kanzitelli/build-react-native-apps-with-simplified-and-predictable-navigation-5b3j)
- "Testing React Native apps with zero effort" - [Medium](https://kanzitelli.medium.com/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-1022aae3a0d3), [Dev.to](https://dev.to/kanzitelli/cli-rn-making-rn-app-developing-experience-as-smooth-as-possible-4e98)
- "Expo + React Native Navigation? Yes!" - [Medium](https://kanzitelli.medium.com/expo-react-native-navigation-yes-ebda0cbfa4b1), [Dev.to](https://dev.to/kanzitelli/expo-react-native-navigation-1pll)

## Why

...do we need yet another starter/boilerplate? Well, I work with React Native for more than 4 years and during the time I started having my own project structure which was a good fit for almost all of the delivered apps. Also, I have come up with some custom [useful services/methods](#useful-servicesmethods) which simplify usage of [React Navigation](https://github.com/react-navigation/react-navigation) and other libraries. Check out [Advantages](#advantages) section.

## License

This project is [MIT licensed](/LICENSE.md)
