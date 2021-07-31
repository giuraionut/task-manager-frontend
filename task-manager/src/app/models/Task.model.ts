export interface Task{
    name?: string;
    details?: string;
    open?: boolean;
    lastUserId?: string;
    authorId?: string;
    responsibleId?: string;
    assigned?: boolean;
    personal?: boolean;
}