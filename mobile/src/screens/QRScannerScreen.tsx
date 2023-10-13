import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { setTankId } from "../redux/slices/forms/servicecallTankSlice";
import {
  QRSCANNERSCREEN,
  Routes,
  SERVICECALLFORMSCREEN,
} from "../types/Routes";
import { SafeAreaView } from "react-native-safe-area-context";
import BarcodeMask from "react-native-barcode-mask";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { TERTIARY_COLOR, getScreenDimensions } from "../types/Styling";
import styles from "../styles/qrscreen";

// Allows to scan QR code only if in mask area
const finderWidth: number = 280;
const finderHeight: number = 230;

type Props = NativeStackScreenProps<Routes, typeof QRSCANNERSCREEN>;

const QRScannerScreen = ({ navigation }: Props) => {
  const { SCREEN_HEIGHT, SCREEN_WIDTH } = getScreenDimensions();
  const viewMinX = (SCREEN_WIDTH - finderWidth) / 2;
  const viewMinY = (SCREEN_HEIGHT - finderHeight) / 2;
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [invalidQR, setInvalidQR] = useState(false);
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
        <Text style={styles.promptText}>Requesting for camera permissions</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.promptText}>
          No access to camera. {"\n\n"}Please enable camera permissions in phone
          settings
        </Text>
      </View>
    );
  }

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const {
        data,
        bounds: { origin } = {},
      } = scanningResult;
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
        const regex = /^Tanknicians Tank ID: (\d+)$/;
        const match = data.match(regex);

        if (match) {
          setScanned(true);
          dispatch(setTankId({ tankId: match[1] }));
          navigation.replace(SERVICECALLFORMSCREEN);
        } else if (!invalidQR) {
          setInvalidQR(true);
          Alert.alert(
            "Invalid QR Code",
            "Please scan a valid Tanknicians QR code",
            [
              {
                text: "OK",
                onPress: () => {
                  setScanned(false);
                  setInvalidQR(false);
                },
              },
            ],
          );
        }
      }
    }
  };

  // Toggle between front and back camera
  function toggleCameraType() {
    setType((current: BarCodeScanner) =>
      current === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back,
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
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Scan Tank QR Code</Text>
          </View>
          <View style={styles.overlay}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name="camera-reverse-outline"
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
