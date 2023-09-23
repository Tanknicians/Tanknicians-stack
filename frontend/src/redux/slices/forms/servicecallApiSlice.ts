import type { ServiceCall } from '../../../../../backend/src/zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const servicecallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadServiceCall: builder.mutation({
      query: (serviceCall) => ({
        url: '/api/mobile/uploadForm',
        method: 'POST',
        body: { ...serviceCall }
      })
    }),
    getServiceCallByTankId: builder.query<
      ServiceCall[],
      { tankId: number; onlyApprovedForms?: boolean }
    >({
      query: ({ tankId, onlyApprovedForms }) => ({
        url: `/api/database/servicecall/fromTank/${tankId}?`,
        method: 'GET',
        params: { isApproved: !!onlyApprovedForms }
      })
    })
  })
});

export const { useGetServiceCallByTankIdQuery, useUploadServiceCallMutation } =
  servicecallApiSlice;
