import { apiSlice } from "../../api/apiSlice";

export const tankDataSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTankData: builder.query<any, number>({
      query: (tankID) => {
        return {
          url: "/api/database/tankMetaData/TankMetadataService",
          method: "GET",
          params: { tankID: tankID },
        };
      },
    }),
  }),
});

export const { useGetTankDataQuery } = tankDataSlice;
