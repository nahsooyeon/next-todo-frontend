import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      description
      completed
      dueDate
    }
  }
`;
