import { ServiceCall } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const servicecallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createServiceCall: builder.mutation({
      query: (serviceCall) => ({
        url: '/api/database/servicecall',
        method: 'POST',
        body: { ...serviceCall }
      })
    }),
    updateServiceCall: builder.mutation({
      query: ({ id, ...serviceCall }) => ({
        url: `/api/database/servicecall/${id}`,
        method: 'PUT',
        body: serviceCall
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

export const {
  useGetServiceCallByTankIdQuery,
  useCreateServiceCallMutation,
  useUpdateServiceCallMutation
} = servicecallApiSlice;
