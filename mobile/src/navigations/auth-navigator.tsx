import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ServiceCallFormScreen from '../screens/ServiceCallFormScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import LoginScreen from '../screens/LoginScreen';
import { Routes } from '../types/Routes';
import * as React from 'react';

const Stack = createNativeStackNavigator<Routes>();

const AuthNavigator = ({ isSignedIn }: { isSignedIn: boolean | null }) => {
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
            <Stack.Screen
              name='PermissionsScreen'
              component={PermissionsScreen}
            />
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
