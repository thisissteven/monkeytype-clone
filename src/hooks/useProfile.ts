import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UserPayload = {
  name: string;
  createdAt: string;
};

export const getCurrentUser = async (): Promise<UserPayload> => {
  const res = await fetch(`${API_URL}/currentUser`);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const useProfile = () => {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR('getCurrentUser', getCurrentUser, {
    fallbackData: null,
  });

  const clearUser = () =>
    mutate(() => null, {
      optimisticData: null,
      populateCache: true,
      revalidate: false,
    });

  return { user, clearUser, isLoading };
};

export default useProfile;
