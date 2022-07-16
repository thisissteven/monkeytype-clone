/* eslint-disable no-console */
import { useMutation } from '@apollo/client';
import * as React from 'react';

import { LOGIN_MUTATION, REGISTER_MUTATION } from './queries';
import reducer from './reducer';
import { ProviderState, UserLoginInput, UserRegisterInput } from './types';

const UserContext = React.createContext({} as ProviderState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    authenticated: false,
    user: null,
    loading: false,
  });

  const [registerUser] = useMutation(REGISTER_MUTATION);
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const register = async (data: UserRegisterInput) => {
    registerUser({ variables: { data } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: 'STOP_LOADING' }));
  };

  const login = async (data: UserLoginInput) => {
    loginUser({ variables: { data } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: 'STOP_LOADING' }));
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const logout = async () => {
    localStorage.removeItem('token');
  };

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token === null || token === undefined) {
          return;
        }
        // const res = await axios.get('/profile', {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // dispatch({ type: 'LOGIN', payload: user });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        localStorage.removeItem('token');
      } finally {
        // dispatch({ type: 'STOP_LOADING' });
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ state, register, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuthState = () => React.useContext(UserContext);
