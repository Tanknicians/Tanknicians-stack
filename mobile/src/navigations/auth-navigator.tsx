import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceCallFormScreen from '../screens/ServiceCallFormScreen';
import { selectCurrentToken } from '../redux/slices/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import QRScannerScreen from '../screens/QRScannerScreen';
import LoginScreen, { styles } from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import {
  LOGINSCREEN,
  QRSCANNERSCREEN,
  Routes,
  SERVICECALLFORMSCREEN
} from '../types/Routes';
import * as React from 'react';

const Stack = createNativeStackNavigator<Routes>();

const AuthNavigator = () => {
  const isSignedIn = !!useSelector(selectCurrentToken);
  const initialRouteName = isSignedIn ? QRSCANNERSCREEN : LOGINSCREEN;
  console.log('isSignedIn: ', isSignedIn);

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
