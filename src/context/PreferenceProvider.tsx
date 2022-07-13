import * as React from 'react';

type ProviderState = {
  preferences: PreferenceState;
  dispatch: React.Dispatch<Action>;
};

const PreferenceContext = React.createContext({} as ProviderState);

type PreferenceState = {
  theme: string;
};

type Action = { type: 'SET_THEME'; payload: string };

const reducer = (state: PreferenceState, action: Action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
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
    theme: '',
  });

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const theme = window.localStorage.getItem('theme');
      if (theme) dispatch({ type: 'SET_THEME', payload: theme });
    }
  }, []);

  return (
    <PreferenceContext.Provider value={{ preferences, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export const usePreferenceContext = () => React.useContext(PreferenceContext);
