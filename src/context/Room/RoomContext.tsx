import { useRouter } from 'next/router';
import * as React from 'react';
import { io } from 'socket.io-client';

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
    roomId: null,
    user: {
      username: user?.username || 'Guest',
      status: {
        wpm: 0,
        progress: 0,
      },
    },
    players: [],
    isPlaying: false,
    socket,
  });

  const { pathname } = useRouter();

  React.useEffect(() => {
    if (pathname === '/multiplayer' || pathname === '/multiplayer/[id]') {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [pathname]);

  return (
    <RoomContext.Provider value={{ room, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => React.useContext(RoomContext);
