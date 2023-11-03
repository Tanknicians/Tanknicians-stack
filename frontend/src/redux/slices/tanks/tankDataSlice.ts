import { CreateTankMetaData, tankSchema } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const tankDataSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query returns a list of all tanks
    getAllTanks: builder.query<tankSchema[], undefined>({
      query: () => ({
        url: '/api/database/tank',
        method: 'GET'
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'TANKS' as const, id })),
              { type: 'TANKS', id: 'LIST' }
            ]
          : [{ type: 'TANKS', id: 'LIST' }]
    }),
    // Query returns tank data for a specific tank
    getTankData: builder.query<tankSchema, number>({
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
    updateTank: builder.mutation<void, tankSchema>({
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
