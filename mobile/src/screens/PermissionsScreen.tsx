import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BarCodeScanner, PermissionStatus } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ImageRequireSource, Linking } from 'react-native';
import { CONTENT_SPACING } from '../types/Constants';
import { QRSCANNERSCREEN, type Routes } from '../types/Routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const BANNER_IMAGE =
// require('../../docs/static/img/11.png') as ImageRequireSource;

type Props = NativeStackScreenProps<Routes, 'PermissionsScreen'>;

const PermissionsScreen = ({ navigation }: Props): React.ReactElement => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  useEffect(() => {
    const checkCameraPermission = async () => {
      if (hasCameraPermission) {
        navigation.replace(QRSCANNERSCREEN);
      } else if (hasCameraPermission === false) {
        await Linking.openSettings();
      }
    };

    checkCameraPermission();
  }, [hasCameraPermission]);

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <Image 
      source={BANNER_IMAGE}
       style={styles.banner} /> */}
        <Text style={styles.welcome}>Welcome to{'\n'}Tanknicians!</Text>
        <View style={styles.permissionsContainer}>
          {!hasCameraPermission && (
            <Text style={styles.permissionText}>
              Tanknicians needs{' '}
              <Text style={styles.bold}>Camera permission</Text>.{' '}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
    paddingBottom: CONTENT_SPACING * 2
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2
  },
  permissionText: {
    fontSize: 17
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold'
  },
  bold: {
    fontWeight: 'bold'
  }
});
