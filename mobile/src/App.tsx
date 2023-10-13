import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import AuthNavigator from './navigations/auth-navigator';
import { persistor } from './redux/store';

const App = () => {
  return (
    <PersistGate persistor={persistor}>
      <PaperProvider>
        <AuthNavigator />
      </PaperProvider>
    </PersistGate>
  );
};

export default App;
