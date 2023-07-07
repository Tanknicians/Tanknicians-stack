import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setTankId } from '../redux/slices/forms/servicecallTankSlice';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarcodeMask from 'react-native-barcode-mask';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Routes, SERVICECALLFORMSCREEN } from '../types/Routes';
import React, { useState } from 'react';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SECONDARY_COLOR,
  TERTIARY_COLOR
} from '../types/Constants';

// Allows to scan QR code only if in mask area
const finderWidth: number = 280;
const finderHeight: number = 230;
const viewMinX = (SCREEN_WIDTH - finderWidth) / 2;
const viewMinY = (SCREEN_HEIGHT - finderHeight) / 2;

type Props = NativeStackScreenProps<Routes, 'QRScannerScreen'>;

const QRScannerScreen = ({ navigation }: Props) => {
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { data, bounds: { origin } = {} } = scanningResult;
      // @ts-ignore
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        // ! TODO: Handle scanned QR code data and navigate to form with user/tank data
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
            <Text style={styles.promptText}>Scan Tank QR Code</Text>
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
    paddingTop: 30,
    paddingBottom: 30
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 100,
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
    fontSize: 34,
    color: TERTIARY_COLOR,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
