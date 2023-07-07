import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import { selectCurrentToken } from './redux/slices/auth/authSlice';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import PermissionsScreen from './screens/PermissionsScreen';
import ServiceCallForm from './components/ServiceCallForm';
import QRScannerScreen from './screens/QRScannerScreen';
import LoginScreen from './screens/LoginScreen';
import type { Routes } from './types/Routes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { persistor } from './redux/store';

const App = () => {
  const Stack = createNativeStackNavigator<Routes>();

  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);

  const isSignedIn = useSelector(selectCurrentToken);

  console.log('isSignedIn: ', !!isSignedIn);

  useEffect(() => {
    async () => {
      const { status: cameraStatus } =
        await BarCodeScanner.getPermissionsAsync();
      console.log('cameraStatus', cameraStatus);
      setHasCameraPermission(cameraStatus === PermissionStatus.GRANTED);
    };
  }, []);

  // let initialRouteName = 'LoginScreen';
  // if (!hasCameraPermission) {
  //   initialRouteName = 'PermissionsScreen';
  // } else if (isSignedIn) {
  //   initialRouteName = 'QRScannerScreen';
  // }

  return (
    <PersistGate persistor={persistor}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationTypeForReplace: 'push'
            }}
            // initialRouteName={initialRouteName}
          >
            {!isSignedIn ? (
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
            ) : (
              <>
                <Stack.Screen
                  name='PermissionsScreen'
                  component={PermissionsScreen}
                />
                <Stack.Screen
                  name='QRScannerScreen'
                  component={QRScannerScreen}
                />
                <Stack.Screen
                  name='ServiceCallForm'
                  component={ServiceCallForm}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PersistGate>
  );
};

export default App;
