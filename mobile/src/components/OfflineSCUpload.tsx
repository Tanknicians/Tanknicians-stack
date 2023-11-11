import { uploadOfflineStoredServiceCalls } from '../redux/slices/forms/servicecallOffline';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import OfflineSCUploadModal from './OfflineSCUploadModal';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

// FIXME - If app crashes while reloading on expo go, offline forms are lost
export const OfflineSCUpload = () => {
  const [uploadServiceCall] = useUploadServiceCallMutation();
  const [offlineFormSubmitTotal, setOfflineFormSubmitTotal] = useState<
    number | null
  >(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // If permissions are not granted, return null
  BarCodeScanner.requestPermissionsAsync().then((permission) => {
    if (!permission.granted) return null;
  });

  // Check if there is an internet connection when the app starts
  // If there is, upload any stored servicecall form data
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (state.isConnected) {
        const uploadOfflineData = async () => {
          const response = await uploadOfflineStoredServiceCalls(
            uploadServiceCall
          );
          setOfflineFormSubmitTotal(response);
        };

        uploadOfflineData();
      }
    });
    setUploadComplete(true);
    // Unsubscribe
    return unsubscribe();
  }, []);
  return (
    uploadComplete && (
      <OfflineSCUploadModal formTotal={offlineFormSubmitTotal} />
    )
  );
};

export default OfflineSCUpload;
