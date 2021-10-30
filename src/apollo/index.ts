import { ApolloClient, FieldPolicy, InMemoryCache } from "@apollo/client";
import {
  concatPagination,
  relayStylePagination,
} from "@apollo/client/utilities";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL + "/graphql",
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          card: concatPagination(),
          music: concatPagination(),
        },
      },
    },
  }),
});
