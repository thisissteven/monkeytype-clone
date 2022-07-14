import * as React from 'react';

import reducer from '@/context/Preference/reducer';
import { ProviderState } from '@/context/Preference/types';

const PreferenceContext = React.createContext({} as ProviderState);

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
