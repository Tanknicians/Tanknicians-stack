import { CreateUser } from '../../../components/CreateUser';
import { apiSlice } from '../../api/apiSlice';

export type OwnedTanks = {
  customerId: number;
  description: string;
  id: number;
  lastDateServiced: Date;
  qrSymbol: number;
  tanknicianSourcedOnly: true;
  type: string;
  volume: number;
};
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

export const userManagementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query returns a list of all users
    getClients: builder.query<UserOption[], boolean>({
      query: (includeTanks) => {
        return {
          url: '/api/database/user',
          method: 'GET',
          params: { includeTanks: includeTanks }
        };
      }
    }),
    // Mutation adds a user to the database
    addUser: builder.mutation<void, CreateUser>({
      query: (userData) => ({
        url: '/api/database/user',
        method: 'POST',
        body: { ...userData }
      })
    }),
    // Mutation adds a tank to a user
    addTankToUser: builder.mutation({
      query: (tankData) => ({
        url: '/api/database/tank',
        method: 'POST',
        body: { ...tankData }
      })
    })
  })
});

export const {
  useGetClientsQuery,
  useAddUserMutation,
  useAddTankToUserMutation
} = userManagementSlice;
