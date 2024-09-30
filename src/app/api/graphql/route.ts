import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getTodosFromDB, getUserByIdFromDB } from "@/lib/db";
import { TodoDTO } from "@/dto/todo.dto";
import { UserDTO } from "@/dto/user.dto";

// GraphQL 스키마 정의
const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    user: User!
		dueDate: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getTodos: [Todo]!
    getTodoById(id: ID!): Todo
  }
`;

// 리졸버 정의
const resolvers = {
  Query: {
    getTodos: async (): Promise<TodoDTO[]> => {
      return await getTodosFromDB(); // 실제 DB에서 TODO 리스트 가져오기
    },
    getTodoById: async (
      parent: unknown,
      args: { id: string }
    ): Promise<TodoDTO | null> => {
      const todos = await getTodosFromDB();
      return todos.find((todo) => todo.id === parseInt(args.id)) ?? null; // ID에 맞는 TODO 찾기
    },
  },
  Todo: {
    user: async (parent: TodoDTO): Promise<UserDTO | null> => {
      return await getUserByIdFromDB(parent.userId); // TODO와 관련된 사용자 정보 가져오기
    },
  },
};

// Apollo Server 인스턴스 생성
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Next.js의 API 라우트 핸들러와 Apollo Server 연결
export const GET = startServerAndCreateNextHandler(server);
export const POST = GET;
