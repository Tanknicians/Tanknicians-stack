import { apiSlice } from '../../api/apiSlice';

export const userTankApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userWithTanks: builder.query({
      query: includeTanks => ({
        url: `api/database/user`,
        method: 'GET',
        params: {
          includeTanks
        }
      })
    })
  })
});

export const { useUserWithTanksQuery } = userTankApiSlice;
