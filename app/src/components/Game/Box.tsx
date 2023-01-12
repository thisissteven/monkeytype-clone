import * as React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';

import { shuffleList } from '@/components/Game/functions';
import TypingInput from '@/components/Game/TypingInput';
import Tooltip from '@/components/Tooltip';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

export default function Box() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _ = require('lodash');

  const {
    preferences: { type, time, isOpen },
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
        className='group relative z-40 mt-2 flex items-center rounded-lg border-0 px-4 py-2 text-fg/50 outline-none transition-colors duration-200 hover:text-fg focus:bg-hl focus:text-bg active:bg-hl active:text-bg'
      >
        <VscDebugRestart className='scale-x-[-1] transform text-2xl' />
        <Tooltip className='top-12 font-primary group-hover:translate-y-0 group-hover:opacity-100 group-focus:top-14 group-focus:translate-y-0 group-focus:opacity-100 group-active:top-14 group-active:translate-y-0 group-active:opacity-100'>
          Restart Test
        </Tooltip>
      </button>
    </>
  );
}
