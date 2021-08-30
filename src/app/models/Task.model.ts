export interface Task {
  id?: string;
  teamId?: string;
  name?: string;
  details?: string;
  open?: boolean;
  lastUserId?: string;
  authorId?: string;
  responsibleId?: string;
  assigned?: boolean;
  private?: boolean;
  priority?: string;
}
