import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus
} from 'expo-barcode-scanner';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { setTankId } from '../redux/slices/forms/servicecallTankSlice';
import { Routes, SERVICECALLFORMSCREEN } from '../types/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarcodeMask from 'react-native-barcode-mask';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  getScreenDimensions
} from '../types/Styling';

// Allows to scan QR code only if in mask area
const finderWidth: number = 280;
const finderHeight: number = 230;

type Props = NativeStackScreenProps<Routes, 'QRScannerScreen'>;

const QRScannerScreen = ({ navigation }: Props) => {
  const { SCREEN_HEIGHT, SCREEN_WIDTH } = getScreenDimensions();
  const viewMinX = (SCREEN_WIDTH - finderWidth) / 2;
  const viewMinY = (SCREEN_HEIGHT - finderHeight) / 2;
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.promptText}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.promptText}>
          No access to camera. {'\n\n'}Please enable camera permission in phone
          settings
        </Text>
      </View>
    );
  }

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { data, bounds: { origin } = {} } = scanningResult;
      // @ts-ignore
      const { x, y } = origin;

      /* Only allow to scan QR code if in mask area
      / Then navigate to ServiceCallFormScreen
      / and set tankId from the scanned QR code 
      */
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        dispatch(setTankId({ tankId: data }));
        navigation.replace(SERVICECALLFORMSCREEN);
      }
    }
    setScanned(false);
  };

  // Toggle between front and back camera
  function toggleCameraType() {
    setType((current: any) =>
      current === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={styles.scanner}
        >
          <BarcodeMask
            edgeColor={TERTIARY_COLOR}
            showAnimatedLine
            animatedLineColor={TERTIARY_COLOR}
          />
          <View style={styles.overlay}>
            <Text style={styles.QRScanPromptText}>Scan Tank QR Code</Text>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name='camera-reverse-outline'
                size={70}
                color={TERTIARY_COLOR}
              />
            </TouchableOpacity>
          </View>
        </BarCodeScanner>
      </View>
    </SafeAreaView>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    paddingTop: 20,
    paddingBottom: 30
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  barcodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  overlay: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: '10%',
    padding: 16
  },
  flipButton: {
    backgroundColor: 'transparent',
    padding: 10
  },
  flipButtonText: {
    fontSize: 18,
    margin: 5,
    color: 'white'
  },
  promptText: {
    fontSize: 18,
    color: TERTIARY_COLOR,
    textAlign: 'center'
  },
  QRScanPromptText: {
    fontSize: 34,
    color: TERTIARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 10
  }
});
