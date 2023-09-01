import { apiSlice } from '../../api/apiSlice';

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClients: builder.query<any, boolean>({
      query: includeTanks => {
        return {
          url: `/api/database/user/getAllUsersAndTanks`,
          method: 'GET',
          params: { includeTanks: includeTanks }
        };
      }
    })
  })
});

export const { useGetClientsQuery } = userManagementSlice;
