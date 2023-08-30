import { apiSlice } from '../../api/apiSlice';

export const servicecallApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    uploadServiceCall: builder.mutation({
      query: serviceCall => ({
        url: `/api/mobile/uploadForm`,
        method: 'POST',
        body: { ...serviceCall },
        responseHandler: 'text'
      })
    })
  })
});

export const { useUploadServiceCallMutation } = servicecallApiSlice;
