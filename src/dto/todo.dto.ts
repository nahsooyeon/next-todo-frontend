export interface TodoDTO {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  dueDate?: string | null;
}
