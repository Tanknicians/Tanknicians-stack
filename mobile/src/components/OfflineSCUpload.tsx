import { uploadOfflineStoredServiceCalls } from '../redux/slices/forms/servicecallOffline';
import { useUploadServiceCallMutation } from '../redux/slices/forms/servicecallApiSlice';
import OfflineSCUploadModal from './OfflineSCUploadModal';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const OfflineSCUpload = () => {
  const [uploadServiceCall] = useUploadServiceCallMutation();
  const [offlineFormSubmitTotal, setOfflineFormSubmitTotal] = useState<
    number | null
  >(0);

  // Check if there is an internet connection when the app starts
  // If there is, upload any stored servicecall form data
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      if (state.isConnected) {
        const uploadOfflineData = async () => {
          setOfflineFormSubmitTotal(
            await uploadOfflineStoredServiceCalls(uploadServiceCall)
          );
        };

        uploadOfflineData();
      }
    });

    // Unsubscribe
    return unsubscribe();
  }, []);

  return <OfflineSCUploadModal formTotal={offlineFormSubmitTotal} />;
};

export default OfflineSCUpload;
