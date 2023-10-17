import { UpdateTankMetaData, tankMetaDataSchema } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const tankDataSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTanks: builder.query<UpdateTankMetaData[], undefined>({
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
    getTankData: builder.query<UpdateTankMetaData, number>({
      query: (tankID) => {
        return {
          url: `/api/database/tank/${tankID}`,
          method: 'GET'
        };
      },
      providesTags: (_result, _error, tankID) => [{ type: 'TANKS', id: tankID }]
    })
  })
});

export const { useGetAllTanksQuery, useGetTankDataQuery } = tankDataSlice;
