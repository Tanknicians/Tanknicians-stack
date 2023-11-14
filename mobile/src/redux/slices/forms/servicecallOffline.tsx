/* 
  Store servicecall form data in local storage when offline
  upload to server when online
*/
import { CreateServiceCall } from '../../../types/zodTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/dist/query';

const SERVICECALLOFFLINE = 'SERVICECALLOFFLINE';

// Store servicecall form data in local storage
// Retrieve any existing data and add new data to it
export async function storeServiceCallOfflineData(data: CreateServiceCall) {
  console.log('Data to be stored: ', data);
  try {
    // Retrieve existing data
    const existingData = await AsyncStorage.getItem(SERVICECALLOFFLINE);
    const existingDataParsed = existingData ? JSON.parse(existingData) : [];

    // Add new data to existing data
    const newData = [...existingDataParsed, data];

    await AsyncStorage.setItem(SERVICECALLOFFLINE, JSON.stringify(newData));
  } catch (error) {
    console.log(error);
  }
}

// Retrieve servicecall form data from local storage
export async function getServiceCallOfflineData() {
  try {
    const result = await AsyncStorage.getItem(SERVICECALLOFFLINE);
    console.log('Result from retrieving SC data from local storage', result);
    if (result === null) return null;

    const resultParsed = result ? JSON.parse(result) : null;
    return resultParsed;
  } catch (error) {
    console.log('Error retrieving SC data from local storage: ', error);
  }
}

// upload servicecall form data to server when online
// returns number of successful uploads
export async function uploadOfflineStoredServiceCalls(
  uploadServiceCall: MutationTrigger<
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    MutationDefinition<any, BaseQueryFn, never, any, 'api'>
  >
) {
  let successfulUploads = 0;
  try {
    // get servicecall form data from local storage
    const serviceCalls = await getServiceCallOfflineData();

    if (serviceCalls === null || serviceCalls.length === 0) return null;
    // parse servicecall form data
    // upload each servicecall to server
    for (let i = serviceCalls.length - 1; i >= 0; i--) {
      try {
        const response = await uploadServiceCall(serviceCalls[i]).unwrap();
        console.log(`Offline upload response: ${JSON.stringify(response)}\n`);
        serviceCalls.splice(i, 1);
        // remove uploaded servicecall from local storage
        successfulUploads++;
      } catch (error) {
        console.log('Error uploading service call form', error);
      }
    }
    await deleteServiceCallOfflineData(serviceCalls);
  } catch (error) {
    console.log('Error retrieving forms from local storage', error);
  }

  return successfulUploads;
}

// delete servicecall form data from local storage
export async function deleteServiceCallOfflineData({
  serviceCalls
}: { serviceCalls: CreateServiceCall[] }) {
  try {
    // update local storage
    await AsyncStorage.setItem(
      SERVICECALLOFFLINE,
      JSON.stringify(serviceCalls)
    );
  } catch (error) {
    console.log(error);
  }
}
