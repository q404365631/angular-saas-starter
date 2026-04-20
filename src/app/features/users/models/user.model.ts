export type UserRole = 'admin' | 'member' | 'viewer';
export type UserStatus = 'active' | 'invited' | 'disabled';

export interface ManagedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface UserListResponse {
  data: ManagedUser[];
  total: number;
}

export type UserWritable = Omit<ManagedUser, 'id' | 'createdAt'>;
