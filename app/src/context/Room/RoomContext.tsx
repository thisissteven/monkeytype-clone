import { useRouter } from 'next/router';
import * as React from 'react';
import { io } from 'socket.io-client';
import { animals, uniqueNamesGenerator } from 'unique-names-generator';

import useProfile from '@/hooks/useProfile';

import reducer from './reducer';
import { RoomContextValues } from './types';

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080',
  {
    autoConnect: false,
  }
);

const RoomContext = React.createContext({} as RoomContextValues);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useProfile();

  const [room, dispatch] = React.useReducer(reducer, {
    text: '',
    mode: 'words',
    isPlaying: false,
    isFinished: false,
    isChatOpen: false,
    winner: null,
    user: {
      isOwner: false,
      roomId: null,
      username:
        localStorage?.getItem('nickname') ||
        user?.name ||
        uniqueNamesGenerator({
          dictionaries: [animals],
          style: 'lowerCase',
        }),
      id: '',
      status: {
        wpm: 0,
        progress: 0,
      },
      isReady: false,
    },
    players: [],
    socket,
  });

  const [timeBeforeRestart, setTimeBeforeRestart] = React.useState(() => 0);

  const resetTime = async (time: number) => setTimeBeforeRestart(time);

  React.useEffect(() => {
    const dispatchTimeout = setTimeout(() => {
      room.user.isReady && dispatch({ type: 'SET_IS_PLAYING', payload: true });
    }, 5000);

    const restartInterval = setInterval(() => {
      if (room.user.isReady) {
        setTimeBeforeRestart((previousTime) => {
          if (previousTime === 0) {
            clearInterval(restartInterval);
          }
          return previousTime - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(restartInterval);
      clearTimeout(dispatchTimeout);
    };
  }, [room.user.isReady]);

  const { pathname } = useRouter();

  socket.on('connect', () => {
    dispatch({ type: 'SET_USER_ID', payload: socket.id });
  });

  socket.on('disconnect', () => {
    dispatch({ type: 'SET_IS_READY', payload: false });
    dispatch({ type: 'SET_ROOM_ID', payload: null });
  });

  React.useEffect(() => {
    if (room.user.id && room.user.roomId) {
      socket.emit('room update', room.user);
    }

    if (pathname === '/multiplayer' && room.user.roomId && room.user.id) {
      socket.emit('leave room', room.user);
    }

    socket.connect();
  }, [pathname, room.user]);

  return (
    <RoomContext.Provider
      value={{ room, dispatch, timeBeforeRestart, resetTime }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => React.useContext(RoomContext);
