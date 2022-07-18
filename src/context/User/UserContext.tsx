import { useLazyQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { UseFormReset } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  GET_CURRENT_USER_QUERY,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from './queries';
import reducer from './reducer';
import { ProviderState, UserLoginInput, UserRegisterInput } from './types';

const UserContext = React.createContext({} as ProviderState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    authenticated: false,
    user: null,
    loading: false,
  });

  const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER_QUERY);
  const [registerUser] = useMutation(REGISTER_MUTATION);
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const register = async (data: UserRegisterInput) => {
    registerUser({ variables: { data } })
      .then((res) => {
        // extract jwt, username, and email from response
        const {
          data: {
            register: {
              jwt,
              user: { username, email, id },
            },
          },
        } = res;

        // default rememberMe === false
        sessionStorage.setItem('token', jwt);

        // save register data to state
        dispatch({ type: 'LOGIN', payload: { email, username, id } });
        toast.success('Welcome to the club!', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'register-success',
        });
      })
      .catch(() => {
        toast.error('Email or username are already taken', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'register-error',
        });
        dispatch({ type: 'LOGOUT' });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const login = async (
    data: UserLoginInput,
    rememberMe: boolean,
    reset: UseFormReset<UserLoginInput>
  ) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    loginUser({ variables: { data } })
      .then((res) => {
        // extract jwt, username, and email from response
        const {
          data: {
            login: {
              jwt,
              user: { username, email, id },
            },
          },
        } = res;

        // if rememberMe => set token to localstorage, else sessionstorage
        if (rememberMe) {
          localStorage.setItem('token', jwt);
        } else {
          sessionStorage.setItem('token', jwt);
        }

        // save login data to state
        dispatch({ type: 'LOGIN', payload: { email, username, id } });
        toast.success('Welcome back!', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'login-success',
        });
      })
      .catch(() => {
        toast.error('Invalid email or password', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'login-error',
        });
        reset();
        dispatch({ type: 'LOGOUT' });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('See you again!', {
      position: toast.POSITION.TOP_CENTER,
      toastId: 'logout',
    });
  };

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        let token = localStorage.getItem('token');
        if (!token) {
          token = sessionStorage.getItem('token');
        }
        if (token === null || token === undefined) {
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }
        await getCurrentUser().then((res) => {
          const {
            data: {
              me: { username, email, id },
            },
          } = res;
          dispatch({ type: 'LOGIN', payload: { username, email, id } });
        });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ state, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthState = () => React.useContext(UserContext);
