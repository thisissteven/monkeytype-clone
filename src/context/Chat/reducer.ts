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
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;