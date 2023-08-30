Commands for running Expo with android emulator and physical device

run command below if first time running the app:
npm install ngrok -g

run the following commands if ngrok is installed:

1. ngrok http <server PORT>
   e.g. `ngrok http 5000`
2. Copy the forwarding address from the ngrok terminal and paste it in the `BASE_URL` variable in `mobile/src/redux/api/apiSlice.ts`
   e.g. `const BASE_URL = https://e0b0-2405-201-201-1a0f-1a0f-1a0f.ngrok.io/
3. npm start

<!-- - Refer to the following link as to why we are using 10.0.2.2 instead of localhost
  https://stackoverflow.com/questions/9808560/why-do-we-use-10-0-2-2-to-connect-to-local-web-server-instead-of-using-computer -->
