import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../types/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarcodeMask from 'react-native-barcode-mask';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

// Color for mask and reverse camera button
import { MAIN_COLOR } from '../types/Constants';

// Allows to scan QR code only if in mask area
const finderWidth: number = 280;
const finderHeight: number = 230;
const viewMinX = (SCREEN_WIDTH - finderWidth) / 2;
const viewMinY = (SCREEN_HEIGHT - finderHeight) / 2;

const QRScannerScreen = () => {
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState<boolean>(false);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
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
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      }
    }
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
          <BarcodeMask edgeColor={MAIN_COLOR} showAnimatedLine />
          <View style={styles.overlay}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name='camera-reverse-outline'
                size={70}
                color={MAIN_COLOR}
              />
            </TouchableOpacity>
            {/* Temporary button. Should be replaced to navigate to form */}
            {scanned && (
              <Button
                color={MAIN_COLOR}
                title='Scan Again'
                onPress={() => setScanned(false)}
              />
            )}
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
    backgroundColor: 'black'
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
    justifyContent: 'flex-end',
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
  }
});
