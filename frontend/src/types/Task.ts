export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
  assignedTo?: string;

  createdAt?: string;
  priority?: string;
  projectId?: string;
  commentsCount?: number;

  comments?: Comment[];   
}
