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
    case 'font-family':
      dispatch({ type: 'SET_FONT_FAMILY', payload: value });
      break;
    default:
      return false;
  }
};
