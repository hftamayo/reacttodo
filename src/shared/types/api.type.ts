export type CrudOperation = 'create' | 'read' | 'update' | 'delete' | 'toggle';
export type EntityType = 'task' | 'user' | 'setting';

export type ApiResponse<T> = {
  code: number;
  resultMessage: string;
  data: T;
  timestamp?: number;
  cacheTTL?: number;
};

export type ApiError = {
  code: number;
  resultMessage: string;
};

export type UserProfileData = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate?: string;
  role?: string;
  isActive?: boolean;
};
