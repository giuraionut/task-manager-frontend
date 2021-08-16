export interface User {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  birthDate?: string;
  teamId?: string;
  tasksId?: Array<string>;
  avatar?: string;
  refreshToken?: string;

  //frontend specific
  selected?: Boolean;
}
