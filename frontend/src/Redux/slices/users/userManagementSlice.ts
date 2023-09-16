import { apiSlice } from '../../api/apiSlice';
import { UserData } from '../../../Components/Dashboard/DefaultCharts';

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClients: builder.query<UserData, boolean>({
      query: includeTanks => {
        return {
          url: '/api/database/user/',
          method: 'GET',
          params: { includeTanks: includeTanks }
        };
      }
    }),
    // Mutation adds a tank to a user
    addTankToUser: builder.mutation({
      query: tankData => ({
        url: '/api/database/tank',
        method: 'POST',
        body: { ...tankData }
      })
    })
  })
});

export const { useGetClientsQuery, useAddTankToUserMutation } =
  userManagementSlice;
