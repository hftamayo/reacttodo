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

export type LoginProps = Pick<FullUser, 'email' | 'password'>;

export type LoginCardProps = UserProps & {
  credentials: LoginProps;
  onClose?: () => void;
  onLogin: (credentials: LoginProps) => Promise<void>;
};
