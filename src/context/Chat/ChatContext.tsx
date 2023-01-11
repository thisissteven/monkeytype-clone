import * as React from 'react';

import useUser from '@/hooks/useUser';

import reducer from './reducer';
import { ChatContextValues } from './types';
import { useRoomContext } from '../Room/RoomContext';

const ChatContext = React.createContext({} as ChatContextValues);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, dispatch] = React.useReducer(reducer, {
    publicChat: [],
    roomChat: [],
    onlineUsers: 0,
    showNotification: false,
  });

  const {
    room: { socket },
  } = useRoomContext();

  const { user } = useUser();

  React.useEffect(() => {
    if (socket) {
      socket.emit('get online users');
      socket
        .off('online users')
        .on('online users', (users: number) =>
          dispatch({ type: 'SET_ONLINE_USERS', payload: users })
        );
    }
  }, [socket, user]);

  return (
    <ChatContext.Provider value={{ chat, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
