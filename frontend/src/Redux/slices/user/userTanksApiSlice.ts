import { apiSlice } from '../../api/apiSlice';

export const userTankApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userWithTanks: builder.query({
      query: includeTanks => ({
        url: `api/database/user`,
        method: 'GET',
        params: {
          includeTanks
        }
      })
    })
  })
});

export const { useUserWithTanksQuery } = userTankApiSlice;

// import { apiSlice } from '../../api/apiSlice';

// export const userTankApiSlice = apiSlice.injectEndpoints({
//   endpoints: builder => ({
//     userWithTanks: builder.query({
//       query: userId => ({
//         url: `api/database/user/${userId}`,
//         method: 'GET'
//         // params: {
//         //   includeTanks: includeTanks // Pass includeTanks as a query parameter
//         // }
//       })
//     })
//   })
// });

// export const { useUserWithTanksQuery } = userTankApiSlice;
