import {
  deleteAllServiceCallOfflineData,
  getServiceCallOfflineData,
  uploadOfflineStoredServiceCalls
} from '../redux/slices/forms/servicecallOffline';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import OfflineSCUploadModal from './OfflineSCUploadModal';
import NetInfo from '@react-native-community/netinfo';
import { useCallback, useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

// FIXME - If app crashes while reloading on expo go, offline forms are lost
export const OfflineSCUpload = () => {
  const [uploadServiceCall] = useUploadServiceCallMutation();
  const [isOffline, setOfflineStatus] = useState(false);
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
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    uploadForms();

    // Unsubscribe
    return unsubscribe;
  }, [isOffline]);

  const uploadForms = useCallback(async () => {
    setUploadComplete(false);
    // TODO - Add loading prompt while uploading
    // Check if there are forms to upload
    const serviceCalls = await getServiceCallOfflineData();
    const offlineFormsTotal = serviceCalls ? serviceCalls.length : 0;

    if (offlineFormsTotal === 0) return null;

    await uploadOfflineStoredServiceCalls(uploadServiceCall)
      .then((result) => {
        setOfflineFormSubmitTotal(result);
      })
      .finally(() => {
        setUploadComplete(true);
      });

    setUploadComplete(true);
  }, [isOffline]);

  return (
    uploadComplete && (
      <OfflineSCUploadModal formTotal={offlineFormSubmitTotal} />
    )
  );
};

export default OfflineSCUpload;
