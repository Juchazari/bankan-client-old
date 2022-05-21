export interface Task {
  id: number;
  name: string;
  due_date?: string;
  description?: string;
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
  labels?: TaskLabel[];
}

export interface CreateTask {
  name: string;
  sectionId: number;
}

export interface TaskComment {
  id: number;
  body: string;
}

export interface TaskAttachment {
  id: number;
}

export interface TaskLabel {
  id: number;
  value: string;
  color?: string;
}
