import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LeaderboardPayload = {
  id: string;
  name: string;
  createdAt: string;
  wpm: number;
  type: 'words' | 'sentences' | 'numbers';
  time: 15 | 30 | 45 | 60 | 120;
};

type LeaderboardAPIPayload = {
  daily: LeaderboardPayload[];
  allTime: LeaderboardPayload[];
};

export const getLeaderboard = async (): Promise<LeaderboardAPIPayload> => {
  const res = await fetch(`${API_URL}/leaderboard`);
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

const useLeaderboard = () => {
  const { data, isLoading } = useSWR('getLeaderboard', getLeaderboard);

  return { daily: data?.daily, allTime: data?.allTime, isLoading };
};

export default useLeaderboard;
