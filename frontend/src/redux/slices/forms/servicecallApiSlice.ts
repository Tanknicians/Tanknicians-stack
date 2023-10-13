import { ServiceCall } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

export const servicecallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceCalls: builder.query<ServiceCall[], { isApproved?: boolean }>({
      query: () => ({ url: '/api/database/servicecall', method: 'GET' })
    }),
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
      { tankId: number; isApproved?: boolean }
    >({
      query: ({ tankId, isApproved }) => ({
        url: `/api/database/servicecall/fromTank/${tankId}`,
        method: 'GET',
        params: { isApproved: isApproved }
      })
    }),
    getUnapprovedServiceCalls: builder.query<ServiceCall[], void>({
      query: () => ({
        url: '/api/database/servicecall',
        method: 'GET',
        params: { isApproved: false }
      })
    })
  })
});

export const {
  useGetAllServiceCallsQuery,
  useGetServiceCallByTankIdQuery,
  useCreateServiceCallMutation,
  useUpdateServiceCallMutation,
  useGetUnapprovedServiceCallsQuery
} = servicecallApiSlice;
