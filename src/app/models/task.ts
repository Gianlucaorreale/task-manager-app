export interface Task {
    id: number;
    title: string;
    description: string;
    assignedTo?: number;
    managerNotes?: string;
    operatorNotes?: string;
    status: 'pending' | 'approved' | 'in-progress' | 'done';
    assignedUsername?: string;
}
