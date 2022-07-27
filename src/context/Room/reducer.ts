import { Action, RoomState } from './types';

const reducer = (state: RoomState, action: Action): RoomState => {
  switch (action.type) {
    case 'SET_ROOM_ID':
      return {
        ...state,
        user: {
          ...state.user,
          roomId: action.payload,
        },
      };
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'SET_IS_OWNER':
      return {
        ...state,
        user: {
          ...state.user,
          isOwner: action.payload,
        },
      };
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isChatOpen: !state.isChatOpen,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload,
        },
      };
    case 'SET_NICKNAME':
      localStorage.setItem('nickname', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
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
    case 'SET_IS_FINISHED':
      return {
        ...state,
        isFinished: action.payload,
      };
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
      };
    case 'SET_IS_READY':
      return {
        ...state,
        user: {
          ...state.user,
          isReady: action.payload,
        },
      };
    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.payload,
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.payload,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
