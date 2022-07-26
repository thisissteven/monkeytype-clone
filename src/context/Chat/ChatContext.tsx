import * as React from 'react';

import reducer from './reducer';
import { ChatContextValues } from './types';

const ChatContext = React.createContext({} as ChatContextValues);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chat, dispatch] = React.useReducer(reducer, {
    publicChat: [],
    roomChat: [],
  });

  return (
    <ChatContext.Provider value={{ chat, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useRoomContext = () => React.useContext(ChatContext);
