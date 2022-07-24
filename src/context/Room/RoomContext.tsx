import { useRouter } from 'next/router';
import * as React from 'react';
import { io } from 'socket.io-client';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

import reducer from './reducer';
import { RoomContextValues } from './types';
import { useAuthState } from '../User/UserContext';

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080',
  {
    autoConnect: false,
  }
);

const RoomContext = React.createContext({} as RoomContextValues);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { user },
  } = useAuthState();

  const [room, dispatch] = React.useReducer(reducer, {
    text: '',
    isPlaying: false,
    isFinished: false,
    winner: null,
    user: {
      roomId: null,
      username:
        user?.username ||
        uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          style: 'capital',
          separator: '',
          length: 2,
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

  const [timeBeforeRestart, setTimeBeforeRestart] = React.useState(() => 5);

  const resetTime = (time: number) => setTimeBeforeRestart(time);

  React.useEffect(() => {
    const restartInterval = setInterval(() => {
      if (room.winner) {
        setTimeBeforeRestart((previousTime) => {
          if (previousTime === 0) {
            clearInterval(restartInterval);
          }
          return previousTime - 1;
        });
      }
    }, 1000);

    return () => clearInterval(restartInterval);
  }, [room.winner]);

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
      dispatch({ type: 'SET_STATUS', payload: { progress: 0, wpm: 0 } });
      dispatch({ type: 'SET_IS_READY', payload: false });
      dispatch({ type: 'SET_IS_PLAYING', payload: false });
      dispatch({ type: 'SET_IS_FINISHED', payload: false });
      dispatch({ type: 'SET_WINNER', payload: null });
      resetTime(5);
    }
    if (pathname === '/multiplayer' || pathname === '/multiplayer/[id]') {
      socket.connect();
    } else {
      socket.disconnect();
    }
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
