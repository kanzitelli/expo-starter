# 🦥 minimal and comfort setup for your next iOS + Android + Web app using Expo

## Quickstart
Make sure you have [Expo](https://expo.io) installed on your machine.

Open terminal and paste the code below
```
git clone https://github.com/kanzitelli/expo-starter.git expo-app && \
cd expo-app && \
yarn && \
expo start
```

Open Expo Go and you should see your app available in the list 🥳

*Hint:* In order to clean git history, run `rm -rf .git`.
*Note:* All changes regarding the app settings should be done in `app.json`.

## What's inside
Simple tab-based app with auth flow logic: `Landing → Auth → Main (2 tabs)`.

- [react-navigation](https://github.com/react-navigation/react-navigation)
- [mobx](https://github.com/mobxjs/mobx)
- [mobx-persist-store](https://github.com/quarrant/mobx-persist-store)
- [typescript](https://github.com/microsoft/TypeScript)

## Try it
- App - [Expo](https://expo.io/@kanzitelli/projects/expo-starter)
- Web - [app.expo.batyr.io](https://app.expo.batyr.io)
- QR Code
<img src="https://xxx-files.ggc.team/oss/expo-starter/qr_code.png" width="30%" title="QR">

## RNW support
There were some issues while trying to run the app on web. However after some research, I could found a [solution]() to [one problem]() and I have written [another script]() that is workaround for [this issue](). They are run on `postinstall` script and doesn't affect your code anyhow.

...more to be added