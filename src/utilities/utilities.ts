import { ApolloClient, InMemoryCache } from "@apollo/client";
export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT as string;

console.log(process.env.TENSOR_GRAPHQL, "TEN");

export const gqlClient = new ApolloClient({
  uri: "https://graphql.tensor.trade/graphql",
  cache: new InMemoryCache(),
});
