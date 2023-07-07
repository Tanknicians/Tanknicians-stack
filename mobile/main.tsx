import { registerRootComponent } from 'expo';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import App from './src/App';
import React from 'react';

const main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(main);
