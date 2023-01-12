import useSWR from 'swr';

import { LeaderboardPayload } from './useLeaderboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type UserPayload = {
  name: string;
  createdAt: string;
};

type ProfileStatsPayload = {
  best: LeaderboardPayload[];
  recent: LeaderboardPayload[];
};

export const getCurrentUser = async (): Promise<UserPayload | null> => {
  const res = await fetch(`${API_URL}/currentUser`);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const getProfileStats = async (): Promise<ProfileStatsPayload> => {
  const res = await fetch(`${API_URL}/profile`);
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
  } = useSWR('getCurrentUser', getCurrentUser);

  const { data: profileStats } = useSWR('getProfileStats', getProfileStats);

  const clearUser = () => mutate(null, false);

  return { user, clearUser, isLoading, profileStats };
};

export default useProfile;
