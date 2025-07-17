//user types:
export type FullUser = {
  id: string;
  fullname: string;
  age: number;
  email: string;
  password: string;
  role: string[];
  status: boolean;
  isAdmin: boolean;
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type UserProps = Omit<
  FullUser,
  'password' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
