import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn
} from '@reduxjs/toolkit/query/react';
import { RefreshTokenData } from '../../zodTypes';
import { setCredentials, logout } from '../slices/auth/authSlice';
import { RootState } from '../store';

let BASE_URL = 'http://localhost:5000/';
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://tanknicians.xyz/';
}

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
  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/api/auth/refresh',
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { token, savedCredentials: user } =
        refreshResult.data as RefreshTokenData;
      // store the new token
      api.dispatch(setCredentials({ token, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if refresh token is invalid, log out
      // TODO: display error message to user then log out after 5 seconds
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USERLIST', 'SERVICECALL', 'UNAPPROVEDSERVICECALL', 'TANKS'],
  endpoints: (builder) => ({})
});
