import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';
import { logout, setToken } from '../slices/auth/authSlice';
import { RootState } from '../store';
import { getRefreshToken } from '../slices/auth/authRefresh';

// ! CHANGE THIS FOR PRODUCTION
// This URL works for android emulator when "npm start" is executed
// const BASE_URL = 'http://10.0.2.2:5000';
// This URL works for physical device when "npm start" is executed
// ! The url will be given by ngrok after running the command ngrok http 5000
const BASE_URL = 'https://tanknicians.xyz';
// const BASE_URL = 'https://11b8-97-100-138-146.ngrok.io';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
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
  if (result?.error?.status === 403) {
    // refresh token
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      api.dispatch(logout());
    }

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: '/api/mobile/refresh', method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const data = refreshResult.data as { token: string };
      const token = data.token;
      // store the new token
      api.dispatch(setToken(token));
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
  endpoints: (builder) => ({})
});
