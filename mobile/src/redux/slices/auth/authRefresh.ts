import * as SecureStore from 'expo-secure-store';

const REFRESHTOKEN = 'REFRESHTOKEN';

// STORE TOKEN
export async function storeToken(value: string) {
  await SecureStore.setItemAsync(REFRESHTOKEN, value);
}

// GET TOKEN
export async function getRefreshToken() {
  const result = await SecureStore.getItemAsync(REFRESHTOKEN);

  if (result === null) {
    return null;
  }

  return result;
}
