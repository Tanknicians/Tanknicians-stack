import { selectCurrentToken } from './redux/slices/auth/authSlice';
import { Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import AuthNavigator from './navigations/auth-navigator';
import { useSelector } from 'react-redux';
import { persistor } from './redux/store';

const App = () => {
  const isSignedIn = useSelector(selectCurrentToken);

  console.log('isSignedIn: ', !!isSignedIn);

  return (
    <PersistGate persistor={persistor}>
      <PaperProvider>
        <AuthNavigator isSignedIn={isSignedIn} />
      </PaperProvider>
    </PersistGate>
  );
};

export default App;
