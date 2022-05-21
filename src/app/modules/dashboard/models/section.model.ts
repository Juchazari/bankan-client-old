import { Task } from '.';

export interface Section {
  id: number;
  name: string;
  tasks: Task[];
}

export interface CreateSection {
  name: string;
  boardId: number;
}
