"use client";

import { AppStore, makeStore } from "@/store";
import { getCookie } from "@/utils/cookie";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { authExchange } from "@urql/exchange-auth";
import { UrqlProvider, cacheExchange, createClient, fetchExchange, ssrExchange } from "@urql/next";
import { subscriptionExchange } from "urql";
import { SnackbarProvider } from "notistack";
import { ReactNode, useMemo, useRef } from "react";
import { Provider } from "react-redux";
import Notifier from "../Notifier";
import { createClient as createWSClient } from "graphql-ws";

const wsClient = createWSClient({
  url: "ws://localhost:8080/query",
});

const Providers = ({ children }: { children: ReactNode }) => {
  // console.log("Providers");

  // urql client https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: "http://localhost:8080",
      exchanges: [
        cacheExchange,
        authExchange(async (utilities) => {
          let accessToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
          let refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);

          return {
            addAuthToOperation: (operation) => {
              return accessToken
                ? utilities.appendHeaders(operation, {
                    Authorization: `Bearer ${accessToken}`,
                  })
                : operation;
            },
            didAuthError: (error) => {
              return error.graphQLErrors.some((item) => {
                return (item.extensions as any).originalError?.message === "Unauthorized";
              });
            },
            willAuthError: (operation) => {
              // Sync tokens on every operation
              accessToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
              refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);

              if (!accessToken) {
                //   // Detect our login mutation and let this operation through:
                //   return (
                //     operation.kind !== 'mutation' ||
                //     // Here we find any mutation definition with the "login" field
                //     !operation.query.definitions.some(definition => {
                //       return (
                //         definition.kind === 'OperationDefinition' &&
                //         definition.selectionSet.selections.some(node => {
                //           // The field name is just an example, since register may also be an exception
                //           return node.kind === 'Field' && node.name.value === 'login';
                //         })
                //       );
                //     })
                //   );
                return true;
              }
              return false;
            },
            refreshAuth: async () => {
              if (refreshToken) {
                try {
                  const refreshTokenUrl = new URL("api/refresh-token", process.env.NEXT_PUBLIC_BASE_URL);
                  refreshTokenUrl.searchParams.append("refreshToken", refreshToken);
                  const res = await fetch(refreshTokenUrl.href);
                  if (!res.ok) {
                    return;
                  }
                  const data = await res.json();
                  accessToken = data.accessToken;
                  refreshToken = data.refreshToken;
                } catch {}

                // const result = await utilities.mutate(REFRESH_TOKEN_MUTATION, {
                //   refreshToken,
                // });
                // if (result.data?.refreshCredentials) {
                //   accessToken = result.data.refreshCredentials.token;
                //   refreshToken = result.data.refreshCredentials.refreshToken;
                //   saveAuthData({ token: accessToken, refreshToken });
                //   return;
                // }
              }

              // This is where auth has gone wrong and we need to clean up and redirect to a login page
              // clearStorage();
              // window.location.reload();
            },
          };
        }),
        ssr,
        fetchExchange,
        subscriptionExchange({
          forwardSubscription: (request) => {
            return {
              subscribe: (observer) => {
                return { unsubscribe: wsClient.subscribe({ ...request, query: request.query || "" }, observer) };
              },
            };
          },
        }),
      ],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  // redux store
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={storeRef.current}>
        <UrqlProvider client={client} ssr={ssr}>
          <SnackbarProvider
            Components={{ error: Notifier, default: Notifier, info: Notifier, success: Notifier, warning: Notifier }}
          >
            {children}
          </SnackbarProvider>
        </UrqlProvider>
      </Provider>
    </LocalizationProvider>
  );
};

export default Providers;
