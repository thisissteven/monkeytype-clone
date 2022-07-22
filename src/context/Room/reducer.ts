import { Action, RoomState } from './types';

const reducer = (state: RoomState, action: Action): RoomState => {
  switch (action.type) {
    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.payload,
      };
    case 'SET_STATUS':
      return {
        ...state,
        user: {
          ...state.user,
          status: {
            progress: action.payload.progress,
            wpm: action.payload.wpm,
          },
        },
      };
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
      };
    case 'ADD_PLAYERS':
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
