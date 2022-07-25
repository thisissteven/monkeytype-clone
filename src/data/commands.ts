const commands = [
  {
    icon: '',
    commandName: 'theme',
    contents: [
      {
        icon: '',
        commandName: 'default',
        contents: [],
        description: '- black, light-gray, and blue',
      },
      {
        icon: '',
        commandName: 'plain',
        contents: [],
        description: '- black, gray, and white',
      },
      {
        icon: '',
        commandName: 'winter',
        contents: [],
        description: '- blue, cyan, and white',
      },
      {
        icon: '',
        commandName: 'snowy-night',
        contents: [],
        description: '- black, dark-gray, and skyblue',
      },
      {
        icon: '',
        commandName: 'vintage',
        contents: [],
        description: '- green and peach',
      },
      {
        icon: '',
        commandName: 'vampire',
        contents: [],
        description: '- black, red, and white',
      },
      {
        icon: '',
        commandName: 'bubblegum',
        contents: [],
        description: '- lightblue, pink, and purple',
      },
      {
        icon: '',
        commandName: 'green-tea',
        contents: [],
        description: '- white, green, and yellowish-green',
      },
      {
        icon: '',
        commandName: 'wood',
        contents: [],
        description: '- brown, dark-gray, and light-gray',
      },
      {
        icon: '',
        commandName: 'beach',
        contents: [],
        description: '- blue, white, and yellow',
      },
      {
        icon: '',
        commandName: 'halloween',
        contents: [],
        description: '- black, orange, and white',
      },
      {
        icon: '',
        commandName: 'botanical',
        contents: [],
        description: '- light-green, green, and peach',
      },
      {
        icon: '',
        commandName: 'eye-pain',
        contents: [],
        description: "- you probably won't like this",
      },
      {
        icon: '',
        commandName: 'exit',
        contents: [],
        description: '- quit command palette',
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
        description: '- 15 seconds',
      },
      {
        icon: '',
        commandName: '30',
        contents: [],
        description: '- 30 seconds',
      },
      {
        icon: '',
        commandName: '45',
        contents: [],
        description: '- 45 seconds',
      },
      {
        icon: '',
        commandName: '60',
        contents: [],
        description: '- equivalent to 1 minute',
      },
      {
        icon: '',
        commandName: '120',
        contents: [],
        description: '- equivalent to 2 minutes',
      },
      {
        icon: '',
        commandName: 'exit',
        contents: [],
        description: '- quit command palette',
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
        description: '- words only',
      },
      {
        icon: '',
        commandName: 'sentences',
        contents: [],
        description: '- sentences only',
      },
      {
        icon: '',
        commandName: 'numbers',
        contents: [],
        description: '- numbers only',
      },
      {
        icon: '',
        commandName: 'exit',
        contents: [],
        description: '- quit command palette',
      },
    ],
    description: '- words? sentences? numbers?',
  },
  {
    icon: '',
    commandName: 'font family',
    contents: [
      {
        icon: '',
        commandName: 'inter',
        contents: [],
        description: '- The five boxing wizards jump quickly.',
      },
      {
        icon: '',
        commandName: 'poppins',
        contents: [],
        description: '- The five boxing wizards jump quickly.',
      },
      {
        icon: '',
        commandName: 'chakra-petch',
        contents: [],
        description: '- The five boxing wizards jump quickly.',
      },
      {
        icon: '',
        commandName: 'exit',
        contents: [],
        description: '- quit command palette',
      },
    ],
    description: '- choose your own font',
  },
  {
    icon: '',
    commandName: 'zen mode',
    contents: [
      {
        icon: '',
        commandName: 'on',
        contents: [],
        description: '- turn on zen mode',
      },
      {
        icon: '',
        commandName: 'off',
        contents: [],
        description: '- turn off zen mode',
      },
    ],
    description: '- only show time and words when typing',
  },
  {
    icon: '',
    commandName: 'exit',
    contents: [],
    description: '- quit command palette',
  },
];

export type CommandType = typeof commands[number];

export default commands;
