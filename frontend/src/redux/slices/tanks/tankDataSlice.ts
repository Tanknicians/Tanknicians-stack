import { CreateTankMetaData, UpdateTankMetaData } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const tankDataSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query returns a list of all tanks
    getAllTanks: builder.query<UpdateTankMetaData[], undefined>({
      query: () => ({
        url: '/api/database/tank',
        method: 'GET'
      })
    }),
    // Query returns tank data for a specific tank
    getTankData: builder.query<UpdateTankMetaData, number>({
      query: (tankID) => {
        return {
          url: `/api/database/tank/${tankID}`,
          method: 'GET'
        };
      }
    }),
    // Mutation adds a tank to a user
    addTankToUser: builder.mutation<number, CreateTankMetaData>({
      query: (tankData) => ({
        url: '/api/database/tank',
        method: 'POST',
        body: { ...tankData }
      }),
      invalidatesTags: (_result, _error, tankData) => [
        { type: 'USERLIST', id: tankData.customerId }
      ]
    }),
    // Mutation edits tank belonging to a user
    updateTank: builder.mutation<void, UpdateTankMetaData>({
      query: ({ id, ...tankData }) => ({
        url: `/api/database/tank/${id}`,
        method: 'PUT',
        body: { ...tankData }
      }),
      invalidatesTags: (_result, _error, tankData) => [
        { type: 'USERLIST', id: tankData.customerId }
      ]
    })
  })
});

export const {
  useGetAllTanksQuery,
  useGetTankDataQuery,
  useAddTankToUserMutation,
  useUpdateTankMutation
} = tankDataSlice;
