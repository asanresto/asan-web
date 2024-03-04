import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const makeUrqlClient = () => {
  return createClient({
    url: "http://localhost:8080/query",
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const { getClient: getServerSideUrql } = registerUrql(makeUrqlClient);
