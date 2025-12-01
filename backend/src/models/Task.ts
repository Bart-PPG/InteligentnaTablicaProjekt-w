export interface Task {
    id?: string;
    projectId: string;
    title: string;
    description: string;
    status: string;
    assignedUserId?: string;
    deadline?: string;
}
