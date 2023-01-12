export type Chat = {
  username: string;
  value: string;
  id: string;
  type: 'notification' | 'message';
  roomId: 'public' | string;
};

export type ChatState = {
  publicChat: Chat[];
  roomChat: Chat[];
  onlineUsers: number;
  showNotification: boolean;
};

export type ChatContextValues = {
  chat: ChatState;
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: 'ADD_PUBLIC_CHAT'; payload: Chat }
  | { type: 'ADD_ROOM_CHAT'; payload: Chat }
  | { type: 'CLEAR_ROOM_CHAT' }
  | { type: 'SET_SHOW_NOTIFICATION'; payload: boolean }
  | { type: 'SET_ONLINE_USERS'; payload: number };
