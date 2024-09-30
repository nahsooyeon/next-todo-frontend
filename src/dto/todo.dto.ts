export interface TodoDTO {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
  dueDate?: string;
}
