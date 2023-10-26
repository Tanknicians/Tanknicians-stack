import { apiSlice } from '../../api/apiSlice';
import { CreateUser, User, tankSchema } from '../../../zodTypes';

export type UserData = {
  OwnedTanks?: tankSchema[];
} & User;

export type UserQueryArgs = {
  includeTanks: boolean;
  isEmployee: boolean | undefined;
};

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserData, number>({
      query: (id) => ({
        url: `/api/database/user/${id}`,
        method: 'GET'
      }),
      providesTags: () => [{ type: 'USERLIST', id: 'LIST' }]
    }),
    // Query returns a list of all users
    getClients: builder.query<UserData[], UserQueryArgs>({
      query: (params) => {
        return {
          url: '/api/database/user',
          method: 'GET',
          params: {
            includeTanks: params.includeTanks,
            isEmployee: params.isEmployee
          }
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'USERLIST' as const, id })),
              { type: 'USERLIST', id: 'LIST' }
            ]
          : [{ type: 'USERLIST', id: 'LIST' }]
    }),
    // Mutation adds a user to the database
    addUser: builder.mutation<void, CreateUser>({
      query: (userData) => ({
        url: '/api/database/user',
        method: 'POST',
        body: { ...userData }
      }),
      invalidatesTags: () => [{ type: 'USERLIST', id: 'LIST' }]
    }),
    // Mutation edits user in database
    editUser: builder.mutation<void, User>({
      query: ({ id, ...userData }) => ({
        url: `/api/database/user/${id}`,
        method: 'PUT',
        body: { ...userData }
      }),
      invalidatesTags: (_result, _error, userData) => [
        { type: 'USERLIST', id: userData.id }
      ]
    })
  })
});

export const {
  useGetClientsQuery,
  useAddUserMutation,
  useEditUserMutation,
  useGetUserQuery
} = userManagementSlice;
