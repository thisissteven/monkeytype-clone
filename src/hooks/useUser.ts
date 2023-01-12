import { getSession, signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';

export const getUser = async () => {
  const user = await getSession();
  return user;
};

const useUser = () => {
  const { data } = useSession();

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

  const user = userData?.user;

  return { user, isLoading: isValidating, error, logout, login };
};

export default useUser;
