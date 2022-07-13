import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { IoMdGlobe } from 'react-icons/io';
import { VscDebugRestart } from 'react-icons/vsc';

import AnimateFade from '@/components/layout/AnimateFade';

import words from '../../wordlists/words.json';

export default function Box() {
  const [list, setList] = React.useState(words);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _ = require('lodash');

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      <div className='mb-4 flex items-center space-x-1.5 text-fg/50 transition-colors duration-200 hover:text-fg'>
        <IoMdGlobe className='text-xl' />
        <div>english</div>
      </div>
      <div className='pointer-events-none relative h-[140px] w-full max-w-[950px] overflow-hidden text-2xl'>
        <div className='absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-bg'></div>
        <input ref={ref} className='absolute h-0 w-0 opacity-0' />
        <div className='absolute top-0 left-0 flex w-full flex-wrap leading-relaxed'>
          <AnimatePresence exitBeforeEnter>
            {list.map((item, index) => (
              <AnimateFade key={item + index}>
                <div className='mx-1'>
                  {item.split('').map((char, id) => (
                    <span key={char + id}>{char}</span>
                  ))}
                </div>
              </AnimateFade>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={() => {
          ref.current.focus();
          setList((list) => _.shuffle(list));
        }}
        className='mt-4 flex items-center rounded-lg border-0 px-4 py-2 text-fg/50 outline-none transition-colors duration-200 hover:text-fg focus:bg-hl focus:text-bg active:bg-hl active:text-bg'
      >
        <VscDebugRestart className='scale-x-[-1] transform text-2xl' />
      </button>
    </>
  );
}
