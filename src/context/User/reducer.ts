import { Action, AuthState } from '@/context/User/types';

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      sessionStorage.removeItem('token');
      localStorage.removeItem('token');
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
