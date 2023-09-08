import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import App from './App';

// Disables react dev tools for production
if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
