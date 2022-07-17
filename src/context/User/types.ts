export type User = {
  email: string;
  username: string;
} | null;

export type AuthState = {
  authenticated: boolean;
  user: User;
  loading: boolean;
};

export type UserRegisterInput = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginInput = {
  identifier: string;
  password: string;
};

export type ProviderState = {
  state: AuthState;
  register: (data: UserRegisterInput) => void;
  login: (data: UserLoginInput, rememberMe: boolean) => void;
  logout: () => void;
};

export type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };
