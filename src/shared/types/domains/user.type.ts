//user types:
export type FullUser = {
  id: string;
  name: string;
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

export type SignUpProps = Pick<FullUser, 'name' | 'age' | 'email' | 'password'>;

export type LoginProps = Pick<FullUser, 'email' | 'password'> & {
  rememberMe?: boolean;
};

// Simplified login types - no more prop drilling
export type LoginFormProps = {
  onLogin: (credentials: LoginProps) => Promise<void>;
  onSuccess?: () => void;
  onClose?: () => void;
  defaultCredentials?: Partial<LoginProps>; // Optional default values
};

// Simplified signup types - no more prop drilling
export type SignUpFormProps = {
  onSignUp: (credentials: SignUpProps) => Promise<void>;
  onSuccess?: () => void;
  onClose?: () => void;
  defaultCredentials?: Partial<SignUpProps>; // Optional default values
};

// For the card wrapper - minimal props
export type LoginCardProps = {
  onClose?: () => void;
  title?: string;
};

export type SignUpCardProps = {
  onClose?: () => void;
  title?: string;
};
