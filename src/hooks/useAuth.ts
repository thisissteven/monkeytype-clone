import { getSession, signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';

import useProfile from './useProfile';

export const getUser = async () => {
  const user = await getSession();
  return user;
};

const useAuth = () => {
  const { data } = useSession();

  const { clearUser } = useProfile();

  const { isValidating, error } = useSWR('getUser', getUser, {
    fallbackData: data,
  });

  const logout = () => {
    signOut({ redirect: false }).then(() => clearUser());
  };

  const login = () => signIn('google');

  return { isValidating, error, logout, login };
};

export default useAuth;
