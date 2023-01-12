import { Action, ChatState } from './types';

const reducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'ADD_PUBLIC_CHAT':
      return {
        ...state,
        publicChat: [...state.publicChat, action.payload],
      };
    case 'ADD_ROOM_CHAT':
      return {
        ...state,
        roomChat: [...state.roomChat, action.payload],
      };
    case 'CLEAR_ROOM_CHAT':
      return {
        ...state,
        roomChat: [],
      };
    case 'SET_SHOW_NOTIFICATION':
      return {
        ...state,
        showNotification: action.payload,
      };
    case 'SET_ONLINE_USERS':
      return {
        ...state,
        onlineUsers: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
