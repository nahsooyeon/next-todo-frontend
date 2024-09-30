import { ApolloClient, InMemoryCache } from "@apollo/client";

// Apollo Client 설정
const client = new ApolloClient({
  uri: "/api/graphql", // GraphQL API 엔드포인트
  cache: new InMemoryCache(),
});

export default client;
