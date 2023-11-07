import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceCallFormScreen from '../screens/ServiceCallFormScreen';
import { selectCurrentToken } from '../redux/slices/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import QRScannerScreen from '../screens/QRScannerScreen';
import LoginScreen from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import {
  LOGINSCREEN,
  QRSCANNERSCREEN,
  Routes,
  SERVICECALLFORMSCREEN
} from '../types/Routes';
import {
  getServiceCallOfflineData,
  uploadOfflineStoredServiceCalls
} from '../redux/slices/forms/servicecallOffline';
import { useEffect, useState } from 'react';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator<Routes>();

const AuthNavigator = () => {
  const isSignedIn = !!useSelector(selectCurrentToken);
  const initialRouteName = isSignedIn ? QRSCANNERSCREEN : LOGINSCREEN;
  const [uploadServiceCall] = useUploadServiceCallMutation();

  // Check if there is an internet connection
  // const [isConnected, setIsConnected] = useState<boolean | null>();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        const uploadOfflineData = async () => {
          await uploadOfflineStoredServiceCalls(uploadServiceCall);
        };

        uploadOfflineData();
      }
    });

    // Unsubscribe
    return unsubscribe();
  }, []);

  // Upload service call forms to server when online
  // useEffect(() => {
  // const uploadOfflineData = async () => {
  //   await uploadOfflineStoredServiceCalls(uploadServiceCall);
  // };

  // uploadOfflineData();
  // }, []);

  //Get service call forms from AsyncStorage
  useEffect(() => {
    const getOfflineData = async () => {
      const offlineData = await getServiceCallOfflineData();
      console.log('Offline SC data', offlineData);
      console.log('Offline SC data length\n', offlineData?.length);
    };

    getOfflineData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push'
        }}
        initialRouteName={initialRouteName}
      >
        {isSignedIn ? (
          <>
            <Stack.Screen name={QRSCANNERSCREEN} component={QRScannerScreen} />
            <Stack.Screen
              name={SERVICECALLFORMSCREEN}
              component={ServiceCallFormScreen}
            />
          </>
        ) : (
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
