import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
};

export default createApolloClient;
