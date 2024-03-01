import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const makeUrqlClient = () => {
  return createClient({
    url: "http://localhost:3001/api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const { getClient: getServerSideUrql } = registerUrql(makeUrqlClient);
