import { Role } from './role';
export interface User {
  user_id: number;
  lastname: string;
  firstname: string;
  role: Role[];
}

export interface userCredentials {
  email: string;
  password: string;
}
