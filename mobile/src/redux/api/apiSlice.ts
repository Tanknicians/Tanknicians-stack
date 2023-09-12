import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../slices/auth/authSlice';
import { RootState } from '../store';

// ! CHANGE THIS FOR PRODUCTION
// This URL works for android emulator when "npm start" is executed
// const BASE_URL = 'http://10.0.2.2:5000';
// This URL works for physical device when "npm start" is executed
// ! The url will be given by ngrok after running the command ngrok http 5000
const BASE_URL =
  'https://2f69-2603-9001-2e00-1465-29af-1852-f084-f198.ngrok.io';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('result baseQueryWithReauth: ', result);
  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/api/auth/refresh',
      api,
      extraOptions
    );
    console.log('refresh result: ', refreshResult);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
});
