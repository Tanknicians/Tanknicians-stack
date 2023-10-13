import { UpdateTankMetaData, tankMetaDataSchema } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const tankDataSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTanks: builder.query<UpdateTankMetaData[], undefined>({
      query: () => ({
        url: '/api/database/tank',
        method: 'GET'
      })
    }),
    getTankData: builder.query<UpdateTankMetaData, number>({
      query: (tankID) => {
        return {
          url: `/api/database/tank/${tankID}`,
          method: 'GET'
        };
      }
    })
  })
});

export const { useGetAllTanksQuery, useGetTankDataQuery } = tankDataSlice;
