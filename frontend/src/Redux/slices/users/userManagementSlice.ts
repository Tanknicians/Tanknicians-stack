import { apiSlice } from '../../api/apiSlice';
import { UserData } from '../../../Components/Dashboard/DefaultCharts';

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<UserData, boolean>({
      query: (includeTanks) => {
        return {
          url: '/api/database/user/',
          method: 'GET',
          params: { includeTanks: includeTanks }
        };
      }
    })
  })
});

export const { useGetClientsQuery } = userManagementSlice;
