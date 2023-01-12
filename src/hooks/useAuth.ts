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

  const {
    data: userData,
    isValidating,
    error,
    mutate,
  } = useSWR('getUser', getUser, {
    fallbackData: data,
  });

  const logout = () => {
    mutate(
      () => {
        signOut({ redirect: false });
        clearUser();
        return null;
      },
      {
        optimisticData: null,
        populateCache: true,
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const login = () => signIn('google');

  const isAuthenticated = !!userData?.user;

  return { isAuthenticated, isValidating, error, logout, login };
};

export default useAuth;
