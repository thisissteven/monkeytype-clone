import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { BsChatLeftTextFill } from 'react-icons/bs';

import { useRoomContext } from '@/context/Room/RoomContext';

export default function Chat() {
  const {
    room: { isChatOpen },
    dispatch,
  } = useRoomContext();

  return (
    <span className='absolute flex w-full cursor-pointer items-center justify-end text-3xl font-bold text-bg'>
      <BsChatLeftTextFill
        onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
        className='active:text-fg/-80 text-3xl text-fg transition-colors duration-200 hover:text-fg/90'
      />
      {/* <div className='absolute -right-2 -top-2 z-50 h-4 w-4 rounded-full bg-fg text-xs text-bg'>
        !
      </div> */}
      <div
        className={`pointer-events-none absolute -bottom-[26rem] -right-4 z-30 flex h-[24.5rem] w-[calc(100%+2rem)] gap-4 rounded-lg bg-bg/80 opacity-0 transition-opacity duration-300 ${
          isChatOpen && 'opacity-100'
        }`}
      ></div>
      <AnimatePresence exitBeforeEnter>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            key='chat-box'
            className='absolute -bottom-[26rem] -right-4 z-40 flex h-[24.5rem] w-[calc(100%+2rem)] cursor-auto justify-between gap-4 rounded-lg bg-bg/30 p-4 ring ring-fg/60 ring-offset-2 ring-offset-bg'
          >
            <div className='flex h-full w-full flex-col justify-between'>
              <div className='xs:scrollbar mx-auto flex h-full w-full flex-col overflow-y-scroll break-words xs:pr-2'>
                <span className='text-normal mt-1 inline-block w-full text-left text-sm text-fg'>
                  <span>EnigmaRich: </span>
                  Haloo alllll
                </span>
                <span className='text-normal mt-1 inline-block w-full text-left text-sm text-fg'>
                  <span>EnigmaRich: </span>
                  How are you guysdsadsadas dsadasdas
                </span>
                <span className='text-normal mt-2 inline-block self-end rounded-lg bg-hl px-2 py-1 text-sm text-fg'>
                  <span className='text-bg'>dsadsadasdas dsadasdasdsa</span>
                </span>
                <span className='text-normal mt-2 inline-block self-end rounded-lg bg-hl px-2 py-1 text-sm text-fg'>
                  <span className='text-bg'>I321321</span>
                </span>
                <span className='text-normal mt-2 inline-block  self-end rounded-lg bg-hl px-2 py-1 text-sm text-fg'>
                  <span className='text-bg'>main ga?</span>
                </span>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className='relative mx-auto w-full xs:pr-4'
              >
                <input
                  placeholder='type to chat'
                  type='text'
                  className='w-full border-x-0 border-b border-t-0 border-fg bg-transparent font-normal text-fg focus:border-fg focus:outline-0 focus:ring-0'
                />
                <button
                  className='absolute right-0 h-full text-sm font-normal text-fg transition-opacity duration-200 hover:opacity-80 active:opacity-70 xs:right-4'
                  type='submit'
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
