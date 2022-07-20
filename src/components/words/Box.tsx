import clsx from 'clsx';
import * as React from 'react';
import { FaPeace } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';

import Tooltip from '@/components/Tooltip';
import { shuffleList } from '@/components/words/functions';
import TypingInput from '@/components/words/TypingInput';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

export default function Box() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _ = require('lodash');

  const {
    preferences: { type, time, isOpen, zenMode },
    dispatch,
  } = usePreferenceContext();

  const [list, setList] = React.useState<string[]>(() => shuffleList(type));

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isOpen) return;
      if (event.key === 'tab') {
        buttonRef.current.focus();
      } else if (event.key !== 'Enter') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    setList(shuffleList(type));
  }, [type]);

  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const buttonRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      {/* Upper  */}
      <div
        onClick={() => dispatch({ type: 'SET_ZEN_MODE', payload: !zenMode })}
        className={clsx(
          'mb-4 flex cursor-pointer items-center space-x-1.5 font-primary transition-colors duration-200 hover:text-hl',
          zenMode ? 'text-hl' : 'text-hl/50'
        )}
      >
        <FaPeace className='text-xl' />
        <div>zen mode - {zenMode ? 'on' : 'off'}</div>
      </div>

      {/* Box */}
      <TypingInput ref={inputRef} text={list.join(' ')} time={time} />

      {/* Restart Button */}
      <button
        onClick={() => {
          inputRef.current.focus();
          setList(shuffleList(type));
        }}
        ref={buttonRef}
        tabIndex={2}
        className='group relative mt-2 flex items-center rounded-lg border-0 px-4 py-2 text-fg/50 outline-none transition-colors duration-200 hover:text-fg focus:bg-hl focus:text-bg active:bg-hl active:text-bg'
      >
        <VscDebugRestart className='scale-x-[-1] transform text-2xl' />
        <Tooltip className='top-12 font-primary group-hover:translate-y-0 group-hover:opacity-100 group-focus:top-14 group-focus:translate-y-0 group-focus:opacity-100 group-active:top-14 group-active:translate-y-0 group-active:opacity-100'>
          Restart Test
        </Tooltip>
      </button>
    </>
  );
}
