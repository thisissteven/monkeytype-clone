import * as React from 'react';

import reducer from './reducer';
import { ChatContextValues } from './types';
import { useRoomContext } from '../Room/RoomContext';

const ChatContext = React.createContext({} as ChatContextValues);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, dispatch] = React.useReducer(reducer, {
    publicChat: [],
    roomChat: [],
    onlineUsers: 0,
  });

  const {
    room: { socket },
  } = useRoomContext();

  React.useEffect(() => {
    if (socket) {
      socket
        .off('online users')
        .on('online users', (users: number) =>
          dispatch({ type: 'SET_ONLINE_USERS', payload: users })
        );
    }
  }, [socket]);

  return (
    <ChatContext.Provider value={{ chat, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
