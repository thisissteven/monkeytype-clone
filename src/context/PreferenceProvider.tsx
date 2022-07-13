import * as React from 'react';

type ProviderState = {
  preferences: PreferenceState;
  dispatch: React.Dispatch<Action>;
};

const PreferenceContext = React.createContext({} as ProviderState);

type PreferenceState = {
  theme: string;
  fontFamily: string;
  isOpen: boolean;
};

type Action =
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_FONT_FAMILY'; payload: string };

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

export default function PreferenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, dispatch] = React.useReducer(reducer, {
    theme: 'default',
    fontFamily: 'chakra-petch',
    isOpen: false,
  });

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const theme = window.localStorage.getItem('theme');
      const fontFamily = window.localStorage.getItem('font-family');
      if (theme) dispatch({ type: 'SET_THEME', payload: theme });
      if (fontFamily)
        dispatch({ type: 'SET_FONT_FAMILY', payload: fontFamily });
    }
  }, []);

  return (
    <PreferenceContext.Provider value={{ preferences, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export const usePreferenceContext = () => React.useContext(PreferenceContext);
