export type Chat = {
  username: string;
  value: string;
  id: string;
};

export type ChatState = {
  publicChat: Chat[];
  roomChat: Chat[];
};

export type ChatContextValues = {
  chat: ChatState;
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: 'ADD_PUBLIC_CHAT'; payload: Chat }
  | { type: 'ADD_ROOM_CHAT'; payload: Chat }
  | { type: 'CLEAR_ROOM_CHAT' };
