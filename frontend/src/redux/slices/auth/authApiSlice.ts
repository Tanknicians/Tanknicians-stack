import { apiSlice } from '../../api/apiSlice';

type LoginCredentials = {
  email: string;
  password: string;
};

type savedCredentials = {
  id: number;
  email: string;
  userId: number;
  role: string;
};

type UserCredentials = {
  savedCredentials: savedCredentials;
  token: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserCredentials, LoginCredentials>({
      query: (credentials) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: { ...credentials }
      })
    })
  })
});

export const { useLoginMutation } = authApiSlice;
