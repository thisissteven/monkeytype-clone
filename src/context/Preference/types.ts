export type PreferenceState = {
  theme: string;
  fontFamily: string;
  isOpen: boolean;
};

export type Action =
  | { type: 'TOGGLE_COMMAND_PALETTE' }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_FONT_FAMILY'; payload: string };

export type ProviderState = {
  preferences: PreferenceState;
  dispatch: React.Dispatch<Action>;
};
