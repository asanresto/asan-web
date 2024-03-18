"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, createClient, fetchExchange, ssrExchange, UrqlProvider } from "@urql/next";
import { createClient as createWSClient } from "graphql-ws";
import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { subscriptionExchange } from "urql";

import { AppStore, makeStore } from "@/store";
import { getCookie } from "@/utils/cookie";

import Notifier from "../Notifier";

const wsClient = createWSClient({
  url: new URL("query", process.env.NEXT_PUBLIC_API_URL).href.replace(/^http/, "ws").replace(/^https/, "wss"),
  connectionParams: () => {
    return {
      Authorization: `Bearer ${getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY)}`,
    };
  },
});

const Providers = ({ children }: { children: ReactNode }) => {
  // urql client https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange();
    const client = createClient({
      url: new URL("query", process.env.NEXT_PUBLIC_API_URL).href,
      exchanges: [
        cacheExchange,
        authExchange(async (utils) => {
          // let accessToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
          // let refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);

          return {
            addAuthToOperation: (operation) => {
              // return accessToken
              //   ? utilities.appendHeaders(operation, {
              //       Authorization: `Bearer ${accessToken}`,
              //     })
              //   : operation;
              // Access token is already in cookie headers
              return operation;
            },
            didAuthError: (error) => {
              // return error.graphQLErrors.some((item) => {
              //   return (item as GraphQLError).message === "unauthorized";
              // });
              return false;
            },
            willAuthError: (operation) => {
              // // Sync tokens on every operation
              // accessToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
              // refreshToken = getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);

              // if (!accessToken) {
              //   //   // Detect our login mutation and let this operation through:
              //   //   return (
              //   //     operation.kind !== 'mutation' ||
              //   //     // Here we find any mutation definition with the "login" field
              //   //     !operation.query.definitions.some(definition => {
              //   //       return (
              //   //         definition.kind === 'OperationDefinition' &&
              //   //         definition.selectionSet.selections.some(node => {
              //   //           // The field name is just an example, since register may also be an exception
              //   //           return node.kind === 'Field' && node.name.value === 'login';
              //   //         })
              //   //       );
              //   //     })
              //   //   );
              //   return true;
              // }

              if (operation.kind === "mutation") {
                console.log(operation.kind);
                console.log(operation.query.definitions);
              }
              return false;
            },
            refreshAuth: async () => {
              // if (refreshToken) {
              //   try {
              //     const res = await fetch(new URL("query", process.env.NEXT_PUBLIC_API_URL), {
              //       next: { revalidate: 0 },
              //       headers: {
              //         "Content-Type": "application/json",
              //       },
              //       method: "POST",
              //       body: JSON.stringify({
              //         query: `
              //           mutation {
              //             refreshToken(refreshToken: "${refreshToken}") {
              //               accessToken
              //               accessTokenTtl
              //               refreshToken
              //               refreshTokenTtl
              //             }
              //           }
              //         `,
              //       }),
              //     });
              //     const data = await res.json();
              //     if (!data.data?.refreshToken) {
              //       // deleteCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
              //       // deleteCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
              //       return;
              //     }
              //     accessToken = data.data.refreshToken.accessToken;
              //     refreshToken = data.data.refreshToken.refreshToken;
              //     setCookie(
              //       process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
              //       accessToken,
              //       data.data.refreshToken.accessTokenTtl,
              //     );
              //     setCookie(
              //       process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
              //       refreshToken,
              //       data.data.refreshToken.refreshTokenTtl,
              //     );
              //   } catch {
              //     deleteCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);
              //     deleteCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY);
              //   }
              //   // const result = await utilities.mutate(REFRESH_TOKEN_MUTATION, {
              //   //   refreshToken,
              //   // });
              //   // if (result.data?.refreshCredentials) {
              //   //   accessToken = result.data.refreshCredentials.token;
              //   //   refreshToken = result.data.refreshCredentials.refreshToken;
              //   //   saveAuthData({ token: accessToken, refreshToken });
              //   //   return;
              //   // }
              // }
              // This is where auth has gone wrong and we need to clean up and redirect to a login page
              // clearStorage();
              // window.location.reload();
            },
          };
        }),
        ssr,
        fetchExchange,
        subscriptionExchange({
          forwardSubscription: (request, operation) => {
            return {
              subscribe: (observer) => {
                return { unsubscribe: wsClient.subscribe({ ...request, query: request.query || "" }, observer) };
              },
            };
          },
        }),
      ],
      suspense: false, // Be careful, setting this to true may cause infinite loops when using useQuery hook
      fetchOptions: {
        credentials: "include",
        mode: "cors",
      },
    });

    return [client, ssr];
  }, []);

  // redux store
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  //  Trick to reload every time the devtools is open.
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    let isDevtoolsOpen = false;
    setInterval(() => {
      const start = new Date().getTime();
      debugger;
      const end = new Date().getTime();
      if (end - start > 0) {
        if (!isDevtoolsOpen) {
          window.location.reload();
          isDevtoolsOpen = true;
        }
      } else {
        isDevtoolsOpen = false;
      }
    }, 1000);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReduxProvider store={storeRef.current}>
        <UrqlProvider client={client} ssr={ssr}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            Components={{ error: Notifier, default: Notifier, info: Notifier, success: Notifier, warning: Notifier }}
          >
            {children}
          </SnackbarProvider>
        </UrqlProvider>
      </ReduxProvider>
    </LocalizationProvider>
  );
};

export default Providers;
