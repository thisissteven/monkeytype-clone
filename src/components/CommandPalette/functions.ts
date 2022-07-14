import { CommandType } from '@/data/commands';

export const filterCommands = (commands: CommandType[], query: string) => {
  return query
    ? commands.filter(
        (command) =>
          command.commandName.toLowerCase().includes(query.toLowerCase()) ||
          command.description.toLocaleLowerCase().includes(query.toLowerCase())
      )
    : commands;
};
