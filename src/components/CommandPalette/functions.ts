import { CommandType } from '@/data/commands';

import { Action } from '@/context/Preference/types';

export const filterCommands = (commands: CommandType[], query: string) => {
  return query
    ? commands.filter(
        (command) =>
          command.commandName.toLowerCase().includes(query.toLowerCase()) ||
          command.description.toLocaleLowerCase().includes(query.toLowerCase())
      )
    : commands;
};

export const handleSelect = (
  selected: string,
  value: string,
  dispatch: React.Dispatch<Action>
) => {
  switch (selected) {
    case 'theme':
      dispatch({ type: 'SET_THEME', payload: value });
      break;
    case 'font family':
      dispatch({ type: 'SET_FONT_FAMILY', payload: value });
      break;
    case 'type':
      dispatch({ type: 'SET_TYPE', payload: value });
      break;
    case 'time':
      dispatch({ type: 'SET_TIME', payload: value });
      break;
    case 'zen mode':
      // eslint-disable-next-line no-case-declarations
      const payload = value === 'on' ? true : false;
      dispatch({ type: 'SET_ZEN_MODE', payload });
      break;
    default:
      return false;
  }
};
