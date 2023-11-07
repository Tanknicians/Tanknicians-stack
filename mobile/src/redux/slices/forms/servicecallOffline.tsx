/* 
  Store servicecall form data in local storage when offline
  upload to server when online
*/
import { ServiceCall } from '../../../types/zodTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { BaseQueryFn, MutationDefinition } from '@reduxjs/toolkit/dist/query';

const SERVICECALLOFFLINE = 'SERVICECALLOFFLINE';

// Store servicecall form data in local storage
// Retrieve any existing data and add new data to it
export async function storeServiceCallOfflineData(data: ServiceCall) {
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
export async function uploadOfflineStoredServiceCalls(
  uploadServiceCall: MutationTrigger<
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    MutationDefinition<any, BaseQueryFn, never, any, 'api'>
  >
) {
  try {
    // get servicecall form data from local storage
    let serviceCalls = await getServiceCallOfflineData();
    if (serviceCalls === null) return;
    // parse servicecall form data
    // upload each servicecall to server
    while (serviceCalls.length > 0) {
      try {
        const response = await uploadServiceCall(serviceCalls[0]).unwrap();
        console.log(`Offline upload response: ${JSON.stringify(response)}\n`);
        // remove uploaded servicecall from local storage
        serviceCalls = await deleteServiceCallOfflineData({
          serviceCalls,
          idx: 0
        });
      } catch (error) {
        console.log('Error uploading service call form', error);
      }
    }
  } catch (error) {
    console.log('Error retrieving forms from local storage', error);
  }
  const formsremaining = await getServiceCallOfflineData();
  console.log('Forms remaining: ', formsremaining.length);
}

// delete servicecall form data from local storage
export async function deleteServiceCallOfflineData({
  serviceCalls,
  idx
}: { serviceCalls: ServiceCall[]; idx: number }) {
  try {
    const serviceCallsFiltered = serviceCalls.filter(
      (_serviceCall: ServiceCall, index: number) => {
        return index !== idx;
      }
    );
    // update local storage
    await AsyncStorage.setItem(
      SERVICECALLOFFLINE,
      JSON.stringify(serviceCallsFiltered)
    );
    console.log('Service call form deleted from local storage: ', idx);
    return serviceCallsFiltered;
  } catch (error) {
    console.log(error);
  }
}
