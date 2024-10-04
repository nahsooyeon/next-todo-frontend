import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
/* import { TodoDTO } from "@/dto/todo.dto";
import { UserDTO } from "@/dto/user.dto"; */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GraphQL 스키마 정의
const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
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

   type Mutation {
    createTodo(title: String!, description: String!, dueDate: String): Todo!
  }
`;

// 리졸버 정의
const resolvers = {
  Query: {
    getTodos: async () => {
      const todos = await prisma.todo.findMany();
      return todos;
    },
  },
  Mutation: {
    createTodo: async (
      _: unknown,
      args: { title: string; description: string; dueDate: string }
    ) => {
      // 새로운 To-Do 항목 생성
      const newTodo = await prisma.todo.create({
        data: {
          title: args.title,
          description: args.description,
          dueDate: args.dueDate,
          completed: false,
        },
      });

      return newTodo;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Next.js의 API 라우트 핸들러와 Apollo Server 연결
export const GET = startServerAndCreateNextHandler(server);
export const POST = GET;
