const commands = [
  {
    icon: '',
    commandName: 'theme',
    contents: ['default', 'winter', 'taro', 'green-tea', 'wood', 'eye-pain'],
    description: '- choose your own theme',
  },
  {
    icon: '',
    commandName: 'time',
    contents: ['15', '30', '45', '60', '120'],
    description: '- pick your own pace',
  },
  {
    icon: '',
    commandName: 'type',
    contents: ['words', 'sentences', 'numbers'],
    description: '- words? sentences? numbers?',
  },
  {
    icon: '',
    commandName: 'font-family',
    contents: ['inter', 'poppins', 'chakra-petch'],
    description: '- poppins is nice :)',
  },
];

export type CommandType = typeof commands[number];

export default commands;
