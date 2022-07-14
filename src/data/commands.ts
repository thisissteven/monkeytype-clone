const commands = [
  {
    icon: '',
    commandName: 'theme',
    contents: [
      {
        icon: '',
        commandName: 'default',
        contents: [],
        description: '- pick your own pace',
      },
      {
        icon: '',
        commandName: 'winter',
        contents: [],
        description: '- pick your own pace',
      },
      {
        icon: '',
        commandName: 'taro',
        contents: [],
        description: '- pick your own pace',
      },
      {
        icon: '',
        commandName: 'green-tea',
        contents: [],
        description: '- pick your own pace',
      },
      {
        icon: '',
        commandName: 'wood',
        contents: [],
        description: '- pick your own pace',
      },
      {
        icon: '',
        commandName: 'eye-pain',
        contents: [],
        description: '- pick your own pace',
      },
    ],
    description: '- choose your own theme',
  },
  {
    icon: '',
    commandName: 'time',
    contents: [
      {
        icon: '',
        commandName: '15',
        contents: [],
        description: '- words? sentences? numbers?',
      },
      {
        icon: '',
        commandName: '30',
        contents: [],
        description: '- words? sentences? numbers?',
      },
      {
        icon: '',
        commandName: '45',
        contents: [],
        description: '- words? sentences? numbers?',
      },
      {
        icon: '',
        commandName: '60',
        contents: [],
        description: '- words? sentences? numbers?',
      },
      {
        icon: '',
        commandName: '120',
        contents: [],
        description: '- words? sentences? numbers?',
      },
    ],
    description: '- pick your own pace',
  },
  {
    icon: '',
    commandName: 'type',
    contents: [
      {
        icon: '',
        commandName: 'words',
        contents: [],
        description: '- poppins is nice :)',
      },
      {
        icon: '',
        commandName: 'sentences',
        contents: [],
        description: '- poppins is nice :)',
      },
      {
        icon: '',
        commandName: 'numbers',
        contents: [],
        description: '- poppins is nice :)',
      },
    ],
    description: '- words? sentences? numbers?',
  },
  {
    icon: '',
    commandName: 'font-family',
    contents: [
      {
        icon: '',
        commandName: 'inter',
        contents: [],
        description: '- poppins is nice :)',
      },
      {
        icon: '',
        commandName: 'poppins',
        contents: [],
        description: '- poppins is nice :)',
      },
      {
        icon: '',
        commandName: 'chakra-petch',
        contents: [],
        description: '- poppins is nice :)',
      },
    ],
    description: '- poppins is nice :)',
  },
];

export type CommandType = typeof commands[number];

export default commands;
