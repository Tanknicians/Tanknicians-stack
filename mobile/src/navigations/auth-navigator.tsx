import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceCallFormScreen from '../screens/ServiceCallFormScreen';
import { selectCurrentToken } from '../redux/slices/auth/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import QRScannerScreen from '../screens/QRScannerScreen';
import LoginScreen from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { Routes } from '../types/Routes';
import * as React from 'react';

const Stack = createNativeStackNavigator<Routes>();

const AuthNavigator = () => {
  const isSignedIn = !!useSelector(selectCurrentToken);
  console.log('isSignedIn: ', isSignedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push'
        }}
      >
        {!isSignedIn ? (
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name='QRScannerScreen' component={QRScannerScreen} />
            <Stack.Screen
              name='ServiceCallFormScreen'
              component={ServiceCallFormScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
