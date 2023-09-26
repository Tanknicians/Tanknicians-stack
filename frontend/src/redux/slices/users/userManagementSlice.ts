import { CreateUser } from "../../../zodTypes";
import { apiSlice } from "../../api/apiSlice";

export type OwnedTanks = {
  customerId: number;
  description?: string;
  id: number;
  lastDateServiced: Date;
  qrSymbol: number;
  tanknicianSourcedOnly: boolean;
  type: string;
  volume: number;
};
export type CreateTank = Omit<
  OwnedTanks,
  "id" | "qrSymbol" | "lastDateServiced"
>;
export type UserOption = {
  OwnedTanks?: OwnedTanks[];
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phone: string;
  isEmployee: boolean;
};

export type UserQuearyArgs = {
  includeTanks: boolean;
  isEmployee: boolean;
};

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query returns a list of all users
    getClients: builder.query<UserOption[], UserQuearyArgs>({
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
    addTankToUser: builder.mutation<number, CreateTank>({
      invalidatesTags: () => [{ type: "USERLIST", id: "LIST" }],
      query: (tankData) => ({
        url: "/api/database/tank",
        method: "POST",
        body: { ...tankData },
      }),
    }),
    // Mutation edits user in database
    editUser: builder.mutation<void, UserOption>({
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
} = userManagementSlice;
