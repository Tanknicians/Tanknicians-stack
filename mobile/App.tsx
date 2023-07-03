import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import PermissionsScreen from './src/screens/PermissionsScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import QRScannerScreen from './src/screens/QRScannerScreen';
import { store, persistor } from './src/redux/store';
import React, { useEffect, useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import type { Routes } from './src/types/Routes';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

const getIsSignedIn = () => {
  const token = store.getState().auth.token;
  if (token) return true;
  return false;
};

const Stack = createNativeStackNavigator<Routes>();

const App = () => {
  const isSignedIn = getIsSignedIn();
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const getPermissionsAsync = async () => {
      const { status: cameraStatus } =
        await BarCodeScanner.getPermissionsAsync();
      setCameraPermission(cameraStatus === PermissionStatus.GRANTED);
    };

    getPermissionsAsync();
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <PaperProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animationTypeForReplace: 'push'
              }}
              // ! QRScannerScreen will be replaced with home screen
              initialRouteName={isSignedIn ? 'QRScannerScreen' : 'LoginScreen'}
            >
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen
                name='PermissionsScreen'
                component={PermissionsScreen}
              />
              <Stack.Screen
                name='QRScannerScreen'
                component={QRScannerScreen}
              />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
