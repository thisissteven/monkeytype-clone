import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type LeaderboardPayload = {
  id?: string;
  createdAt?: string | undefined;
  name: string;
  wpm: number;
  type: string;
  time: number;
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
  const { data, isLoading } = useSWR('getLeaderboard', getLeaderboard, {
    fallbackData: null,
  });

  const createLeaderboardData = async (data: LeaderboardPayload) => {
    const res = await fetch(`${API_URL}/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data }),
    });
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  };

  return {
    daily: data?.daily,
    allTime: data?.allTime,
    isLoading,
    createLeaderboardData,
  };
};

export default useLeaderboard;
