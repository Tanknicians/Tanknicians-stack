- DEFAULT
  Commands for running Expo with android emulator:

1. npx expo start --localhost --android

- Refer to the following link as to why we are using 10.0.2.2 instead of localhost
  https://stackoverflow.com/questions/9808560/why-do-we-use-10-0-2-2-to-connect-to-local-web-server-instead-of-using-computer

Commands for running Expo with ExpoGo app on physical device:

1. ngrok http <server PORT>
2. npx expo start --tunnel
