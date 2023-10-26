import { CreateServiceCall, ServiceCall } from '../../../zodTypes';
import { apiSlice } from '../../api/apiSlice';

interface ReturnDataSchema {
  tankId: number;
  alkalinity: [number, Date][];
  calcium: [number, Date][];
  nitrate: [number, Date][];
  phosphate: [number, Date][];
}

export const servicecallApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceCalls: builder.query<ServiceCall[], { isApproved?: boolean }>({
      query: () => ({ url: '/api/database/servicecall', method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'SERVICECALL' as const,
                id
              })),
              { type: 'SERVICECALL', id: 'LIST' }
            ]
          : [{ type: 'SERVICECALL', id: 'LIST' }]
    }),
    getAllServiceCallsByTankIdAndDateRange: builder.query<
      ReturnDataSchema,
      { tankId: number; start?: Date; end?: Date }
    >({
      query: ({ tankId, start, end }) => ({
        url: `/api/database/servicecall/range/${tankId}`,
        method: 'GET',
        params: { start, end }
      })
    }),
    createServiceCall: builder.mutation<void, CreateServiceCall>({
      query: (serviceCall) => ({
        url: '/api/database/servicecall',
        method: 'POST',
        body: { ...serviceCall }
      }),
      invalidatesTags: () => [{ type: 'SERVICECALL', id: 'LIST' }]
    }),
    updateServiceCall: builder.mutation<void, ServiceCall>({
      query: ({ id, ...serviceCall }) => ({
        url: `/api/database/servicecall/${id}`,
        method: 'PUT',
        body: serviceCall
      }),
      invalidatesTags: (_result, _error, serviceCall) => {
        return [
          { type: 'SERVICECALL', id: serviceCall.id },
          { type: 'UNAPPROVEDSERVICECALL', id: serviceCall.id },
          { type: 'TANKS', id: serviceCall.tankId }
        ];
      }
    }),
    getServiceCallByTankId: builder.query<
      ServiceCall[],
      { tankId: number; isApproved?: boolean }
    >({
      query: ({ tankId, isApproved }) => ({
        url: `/api/database/servicecall/fromTank/${tankId}`,
        method: 'GET',
        params: { isApproved: isApproved }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'SERVICECALL' as const,
                id
              })),
              { type: 'SERVICECALL', id: 'LIST' }
            ]
          : [{ type: 'SERVICECALL', id: 'LIST' }]
    }),
    getUnapprovedServiceCalls: builder.query<ServiceCall[], void>({
      query: () => ({
        url: '/api/database/servicecall',
        method: 'GET',
        params: { isApproved: false }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'UNAPPROVEDSERVICECALL' as const,
                id
              })),
              { type: 'UNAPPROVEDSERVICECALL', id: 'LIST' }
            ]
          : [{ type: 'UNAPPROVEDSERVICECALL', id: 'LIST' }]
    })
  })
});

export const {
  useGetAllServiceCallsQuery,
  useGetServiceCallByTankIdQuery,
  useCreateServiceCallMutation,
  useUpdateServiceCallMutation,
  useGetUnapprovedServiceCallsQuery,
  useGetAllServiceCallsByTankIdAndDateRangeQuery
} = servicecallApiSlice;
