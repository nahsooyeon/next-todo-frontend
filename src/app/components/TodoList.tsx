"use client";

import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../../graphql/queries";
import TodoItem from "./TodoItem";
import { TodoDTO } from "@/dto/todo.dto";



const TodoList: React.FC = () => {
	const { loading, error, data } = useQuery(GET_TODOS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h1>To-Do List</h1>
			<ul>
				{data.getTodos.length === 0 && <p>No todos found</p>}
				{data.getTodos.map((todo: TodoDTO) => (
					<li key={todo.id}>
						<TodoItem data={todo} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;