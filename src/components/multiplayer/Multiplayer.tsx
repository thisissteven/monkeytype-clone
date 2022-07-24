import clsx from 'clsx';
import * as React from 'react';

import TypingInput from '@/components/multiplayer/TypingInput';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';
import { useRoomContext } from '@/context/Room/RoomContext';

export default function Multiplayer() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _ = require('lodash');

  const {
    preferences: { isOpen },
  } = usePreferenceContext();

  const {
    room: {
      user: { isReady, isPlaying },
    },
    dispatch,
  } = useRoomContext();

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isOpen) return;
      if (event.key === 'tab') {
        buttonRef.current.focus();
      } else if (event.key !== 'Enter' && !event.ctrlKey) {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const buttonRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <>
      {/* Multiplayer */}
      <TypingInput ref={inputRef} />

      <div>
        <button
          ref={buttonRef}
          disabled={isPlaying}
          tabIndex={2}
          onClick={() => dispatch({ type: 'SET_IS_READY', payload: !isReady })}
          className={clsx(
            'outline-solid mb-8 transform rounded-lg px-3 py-2 font-primary text-bg shadow-b shadow-fg/50 outline-offset-[6px] transition-all duration-200 focus:outline-dashed focus:outline-[3px] active:translate-y-[4px] active:shadow-none',
            [
              isReady
                ? 'active:bg-fg-50 bg-fg/70 hover:bg-fg/60 focus:outline-fg/30'
                : 'active:bg-fg-80 bg-fg hover:bg-fg/90 focus:outline-fg/50 ',
            ],
            [isPlaying && 'cursor-not-allowed']
          )}
        >
          {isReady ? 'Cancel' : 'Ready'}
        </button>
      </div>
    </>
  );
}
