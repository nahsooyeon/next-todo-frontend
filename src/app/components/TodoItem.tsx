import { TodoDTO } from "@/dto/todo.dto";

interface TodoItemProps {
	data: TodoDTO;
}

const TodoItem: React.FC<TodoItemProps> = ({ data }) => {
	return (
		<div>
			<h2>{data.title}</h2>
			<p>{data.description}</p>
			<p>Due Date: {data.dueDate}</p>
			<p>{data.completed ? "Completed" : "Incomplete"}</p>
		</div>
	);
};

export default TodoItem;