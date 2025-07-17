//user types:
export type FullUser = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  status: boolean;
  role: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type UserProps = Omit<
  FullUser,
  'password' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
