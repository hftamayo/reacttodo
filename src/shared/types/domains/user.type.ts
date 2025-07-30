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

export type SignUpProps = Pick<
  FullUser,
  'fullname' | 'age' | 'email' | 'password'
>;

export type LoginProps = Pick<FullUser, 'email' | 'password'> & {
  rememberMe?: boolean;
};

export type LoginCardProps = UserProps & {
  credentials: LoginProps;
  onClose?: () => void;
  onLogin: (credentials: LoginProps) => Promise<void>;
  isLogginIn?: boolean;
};

export type LoginFormProps = {
  credentials: LoginProps;
  onClose?: () => void;
  onSuccess?: () => void;
  onLogin: (credentials: LoginProps) => Promise<void>;
};
