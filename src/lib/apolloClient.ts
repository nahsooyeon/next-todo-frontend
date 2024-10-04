import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { getSession } from "next-auth/react"; // Next-Auth의 세션에서 토큰 가져오기
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql", // GraphQL API 엔드포인트
});
const authLink = setContext(async (_, { headers }) => {
  // 세션에서 JWT 토큰을 가져옴
  const session = await getSession();
  const token = session?.accessToken;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", // 토큰이 있으면 Authorization 헤더에 추가
    },
  };
});
// Apollo Client 설정
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink), // AuthLink 추가
});

export default client;
