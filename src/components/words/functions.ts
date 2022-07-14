import numbers from '../../data/numbers.json';
import sentences from '../../data/sentences.json';
import words from '../../data/words.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

export const shuffleList = (type: string) => {
  switch (type) {
    case 'words':
      return _.shuffle(words);
    case 'numbers':
      return _.shuffle(numbers);
    case 'sentences':
      // eslint-disable-next-line no-case-declarations
      let sentencesArray = _.shuffle(sentences);
      sentencesArray = sentencesArray.join(' ').split(' ');
      return sentencesArray;
    default:
      return _.shuffle(words);
  }
};
