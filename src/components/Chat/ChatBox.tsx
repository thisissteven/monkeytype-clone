import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { BsChatLeftTextFill } from 'react-icons/bs';

import { useChatContext } from '@/context/Chat/ChatContext';
import { Chat } from '@/context/Chat/types';
import { useRoomContext } from '@/context/Room/RoomContext';

import Bubble from './Bubble';
import ChatInput from './ChatInput';

export default function ChatBox() {
  const {
    room: {
      isChatOpen,
      user: { id },
      socket,
    },
    dispatch,
  } = useRoomContext();

  const {
    chat: { roomChat },
    dispatch: chatDispatch,
  } = useChatContext();

  const divRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    socket
      .off('receive chat')
      .on('receive chat', ({ id, username, value }: Chat) => {
        chatDispatch({
          type: 'ADD_ROOM_CHAT',
          payload: { id, username, value },
        });
      });
  }, [chatDispatch, socket]);

  React.useEffect(() => {
    if (divRef.current && isChatOpen) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [roomChat, isChatOpen]);

  return (
    <span className='z-1 absolute flex w-full cursor-pointer items-center justify-end text-3xl font-bold text-bg'>
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
              <div
                ref={divRef}
                className='xs:scrollbar mx-auto flex h-full w-full flex-col overflow-y-scroll break-words py-2 pr-4 xs:pr-2'
              >
                {roomChat.map((chat, index) =>
                  chat.id === id ? (
                    <Bubble key={index} isYou value={chat.value} />
                  ) : (
                    <Bubble
                      key={index}
                      username={chat.username}
                      value={chat.value}
                    />
                  )
                )}
              </div>
              <ChatInput />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
