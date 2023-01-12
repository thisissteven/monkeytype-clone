import { getSession, signOut, useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UserPayload = {
  name: string;
  createdAt: string;
};

export const getUser = async () => {
  const user = await getSession();
  return user;
};

export const getCurrentUser = async (): Promise<UserPayload> => {
  const res = await fetch(`${API_URL}/user`);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
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

  const { data: user } = useSWR('getCurrentUser', getCurrentUser);

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

  const isAuthenticated = !!userData?.user;

  return { user, isAuthenticated, isValidating, error, logout, login };
};

export default useUser;
