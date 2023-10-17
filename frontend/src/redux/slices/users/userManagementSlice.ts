import { apiSlice } from '../../api/apiSlice';
import { CreateUser, UpdateTankMetaData, UpdateUser } from '../../../zodTypes';

export type UserData = {
  OwnedTanks?: UpdateTankMetaData[];
} & UpdateUser;

export type UserQueryArgs = {
  includeTanks: boolean;
  isEmployee: boolean | undefined;
};

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserData, number>({
      providesTags: () => [{ type: 'USERLIST', id: 'LIST' }],
      query: (id) => ({
        url: `/api/database/user/${id}`,
        method: 'GET'
      })
    }),
    // Query returns a list of all users
    getClients: builder.query<UserData[], UserQueryArgs>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'USERLIST' as const, id })),
              { type: 'USERLIST', id: 'LIST' }
            ]
          : [{ type: 'USERLIST', id: 'LIST' }],
      query: (params) => {
        return {
          url: '/api/database/user',
          method: 'GET',
          params: {
            includeTanks: params.includeTanks,
            isEmployee: params.isEmployee
          }
        };
      }
    }),
    // Mutation adds a user to the database
    addUser: builder.mutation<void, CreateUser>({
      invalidatesTags: () => [{ type: 'USERLIST', id: 'LIST' }],
      query: (userData) => ({
        url: '/api/database/user',
        method: 'POST',
        body: { ...userData }
      })
    }),
    // Mutation edits user in database
    editUser: builder.mutation<void, UpdateUser>({
      invalidatesTags: () => [{ type: 'USERLIST', id: 'LIST' }],
      query: ({ id, ...userData }) => ({
        url: `/api/database/user/${id}`,
        method: 'PUT',
        body: { ...userData }
      })
    })
  })
});

export const {
  useGetClientsQuery,
  useAddUserMutation,
  useEditUserMutation,
  useGetUserQuery
} = userManagementSlice;
