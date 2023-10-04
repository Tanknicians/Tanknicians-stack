import { apiSlice } from "../../api/apiSlice";
import {
  CreateTankMetaData,
  CreateUser,
  UpdateTankMetaData,
  UpdateUser,
} from "../../../zodTypes";

export type UserData = {
  OwnedTanks?: UpdateTankMetaData[];
} & UpdateUser;

export type UserQuearyArgs = {
  includeTanks: boolean | undefined;
  isEmployee: boolean | undefined;
};

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserData, number>({
      providesTags: () => [{ type: "USERLIST", id: "LIST" }],
      query: (id) => ({
        url: `/api/database/user/${id}`,
        method: "GET",
      }),
    }),
    // Query returns a list of all users
    getClients: builder.query<UserData[], UserQuearyArgs>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "USERLIST" as const, id })),
              { type: "USERLIST", id: "LIST" },
            ]
          : [{ type: "USERLIST", id: "LIST" }],
      query: (params) => {
        return {
          url: "/api/database/user",
          method: "GET",
          params: {
            includeTanks: params.includeTanks,
            isEmployee: params.isEmployee,
          },
        };
      },
    }),
    // Mutation adds a user to the database
    addUser: builder.mutation<void, CreateUser>({
      invalidatesTags: () => [{ type: "USERLIST", id: "LIST" }],
      query: (userData) => ({
        url: "/api/database/user",
        method: "POST",
        body: { ...userData },
      }),
    }),
    // Mutation adds a tank to a user
    addTankToUser: builder.mutation<number, CreateTankMetaData>({
      invalidatesTags: () => [{ type: "USERLIST", id: "LIST" }],
      query: (tankData) => ({
        url: "/api/database/tank",
        method: "POST",
        body: { ...tankData },
      }),
    }),
    // Mutation edits user in database
    editUser: builder.mutation<void, UpdateUser>({
      invalidatesTags: () => [{ type: "USERLIST", id: "LIST" }],
      query: ({ id, ...userData }) => ({
        url: `/api/database/user/${id}`,
        method: "PUT",
        body: { ...userData },
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddUserMutation,
  useAddTankToUserMutation,
  useEditUserMutation,
  useGetUserQuery,
} = userManagementSlice;
