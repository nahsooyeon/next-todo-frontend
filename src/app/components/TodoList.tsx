"use client";

import { useQuery } from "@apollo/client";
import { GET_TODOS } from "../../graphql/queries";
import TodoItem from "./TodoItem";
import { TodoDTO } from "@/dto/todo.dto";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "@/graphql/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	dueDate: z.string()
});

type FormType = z.infer<typeof formSchema>;


const TodoList: React.FC = () => {
	const { loading, error, data } = useQuery(GET_TODOS);
	const [createTodo, { loading: addLoading, error: addError }] = useMutation(CREATE_TODO, {
		refetchQueries: [{ query: GET_TODOS }], // To-Do 목록을 새로고침합니다.
	});
	const { handleSubmit, register } = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			dueDate: "",
		},
	});

	const onSubmitNewTodo: SubmitHandler<FormType> = async (data) => {
		try {
			await createTodo({
				variables: {
					title: data.title,
					description: data.description,
					dueDate: dayjs(data.dueDate).toISOString(),
					completed: false,
				},
			});

		} catch (err) {
			console.error("Error creating todo:", err);
		}
	};



	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h1>To-Do List</h1>
			<form onSubmit={handleSubmit(onSubmitNewTodo)}>
				<input {...register("title")} placeholder="Title" />
				<input {...register("description")} placeholder="Description" />
				<input {...register("dueDate")} type="date" placeholder="Due Date" />
				<button type="submit">제출</button>
			</form>
			{addLoading && <p>Adding new todo...</p>}
			{addError && <p>Error adding new todo: {addError.message}</p>}
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
