import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { AppRouter } from "../../../../../backend/src/server";

export const getToken = () => sessionStorage.getItem("token") ?? "";

export const trpc = createTRPCReact<AppRouter>();

const login = trpc.login.login;

console.log(login);

export const queryClient = new QueryClient();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:5000/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: getToken(),
        };
      },
    }),
  ],
});
