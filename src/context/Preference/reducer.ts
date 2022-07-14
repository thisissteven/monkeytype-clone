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
