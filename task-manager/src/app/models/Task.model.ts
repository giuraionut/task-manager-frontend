export interface Task{
    id?: string;
    name?: string;
    details?: string;
    open?: boolean;
    lastUserId?: string;
    authorId?: string;
    responsibleId?: string;
    assigned?: boolean;
    personal?: boolean;
}