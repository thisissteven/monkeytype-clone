import { Action, PreferenceState } from '@/context/Preference/types';

const reducer = (state: PreferenceState, action: Action) => {
  switch (action.type) {
    case 'SET_THEME':
      if (typeof window !== undefined) {
        window.localStorage.setItem('theme', action.payload);
      }
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_FONT_FAMILY':
      if (typeof window !== undefined) {
        window.localStorage.setItem('font-family', action.payload);
      }
      return {
        ...state,
        fontFamily: action.payload,
      };
    case 'SET_TYPE':
      if (typeof window !== undefined) {
        window.localStorage.setItem('type', action.payload);
      }
      return {
        ...state,
        type: action.payload,
      };
    case 'SET_TIME':
      if (typeof window !== undefined) {
        window.localStorage.setItem('time', action.payload);
      }
      return {
        ...state,
        time: action.payload,
      };
    case 'SET_ZEN_MODE':
      if (typeof window !== undefined) {
        window.localStorage.setItem('zen-mode', JSON.stringify(action.payload));
      }
      return {
        ...state,
        zenMode: action.payload,
      };
    case 'TOGGLE_COMMAND_PALETTE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
