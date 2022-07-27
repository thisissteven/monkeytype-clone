import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import * as React from 'react';
import { GiDiscussion } from 'react-icons/gi';

import { useChatContext } from '@/context/Chat/ChatContext';
import { Chat } from '@/context/Chat/types';
import { useRoomContext } from '@/context/Room/RoomContext';

import Bubble from './Bubble';
import ChatInput from './ChatInput';

export default function ChatBox({
  className,
  label,
  isRoomChat,
}: {
  className: string;
  label: string;
  isRoomChat?: boolean;
}) {
  const {
    room: {
      isChatOpen,
      user: { id },
      socket,
    },
    dispatch,
  } = useRoomContext();

  const {
    chat: { roomChat, publicChat },
    dispatch: chatDispatch,
  } = useChatContext();

  const { pathname } = useRouter();

  const [showNotification, setShowNotification] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);

  const divRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    isChatOpen && setShowNotification(false);
    socket
      .off('receive chat')
      .on('receive chat', ({ id, username, value, type, roomId }: Chat) => {
        if (roomId === 'public') {
          chatDispatch({
            type: 'ADD_PUBLIC_CHAT',
            payload: { id, username, value, type, roomId },
          });
        } else {
          chatDispatch({
            type: 'ADD_ROOM_CHAT',
            payload: { id, username, value, type, roomId },
          });
        }
        if (!isChatOpen) setShowNotification(true);
      });
  }, [chatDispatch, isChatOpen, socket]);

  React.useEffect(() => {
    if (divRef.current && isChatOpen) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [roomChat, publicChat, isChatOpen, isPublic]);

  return (
    <span className='z-1 absolute flex w-full cursor-pointer items-center justify-end text-3xl font-bold text-bg'>
      <div
        onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
        className='active:text-fg/-80 flex flex-col items-center gap-1 text-3xl text-fg transition-colors duration-200 hover:text-fg/90'
      >
        <GiDiscussion />
        <span className='mr-2 text-sm'>{label}</span>
      </div>
      {showNotification && isRoomChat && (
        <div className='absolute -right-2 -top-2 h-4 w-4 animate-bounce rounded-full bg-fg text-xs text-bg'>
          !
        </div>
      )}
      <div
        className={`pointer-events-none absolute -bottom-[26rem] -right-4 z-30 flex h-[24.5rem] gap-4 rounded-lg bg-bg/90 opacity-0 transition-opacity duration-300 ${
          isChatOpen && 'opacity-100'
        } ${className}`}
      ></div>
      <AnimatePresence exitBeforeEnter>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            key='chat-box'
            className={`absolute -bottom-[26rem] -right-4 z-40 flex h-[24.5rem] cursor-auto justify-between gap-4 rounded-lg bg-bg/30 p-4 ring ring-fg/60 ring-offset-2 ring-offset-bg ${className}`}
          >
            <div className='flex h-full w-full flex-col justify-between'>
              <div className='mb-2 flex gap-2 text-sm'>
                {isRoomChat && (
                  <button
                    onClick={() => setIsPublic((isPublic) => !isPublic)}
                    className={clsx(
                      'rounded-lg px-2 py-1 transition-colors duration-200',
                      [!isPublic ? 'bg-fg text-bg' : 'text-hl']
                    )}
                  >
                    room
                  </button>
                )}
                <button
                  onClick={() => setIsPublic((isPublic) => !isPublic)}
                  className={clsx(
                    'rounded-lg px-2 py-1 transition-colors duration-200',
                    [isPublic || !isRoomChat ? 'bg-fg text-bg' : 'text-hl']
                  )}
                >
                  public
                </button>
              </div>
              <div
                ref={divRef}
                className='xs:scrollbar mx-auto flex h-full w-full flex-col overflow-y-scroll break-words py-2 pr-4 xs:pr-2'
              >
                {(isPublic || pathname === '/multiplayer') &&
                  publicChat.map((chat, index) =>
                    chat.id === id ? (
                      <Bubble
                        type={chat.type}
                        key={index}
                        isYou
                        value={chat.value}
                      />
                    ) : (
                      <Bubble
                        type={chat.type}
                        key={index}
                        username={chat.username}
                        value={chat.value}
                      />
                    )
                  )}
                {!isPublic &&
                  isRoomChat &&
                  roomChat.map((chat, index) =>
                    chat.id === id ? (
                      <Bubble
                        type={chat.type}
                        key={index}
                        isYou
                        value={chat.value}
                      />
                    ) : (
                      <Bubble
                        type={chat.type}
                        key={index}
                        username={chat.username}
                        value={chat.value}
                      />
                    )
                  )}
              </div>
              <ChatInput
                isPublic={pathname === '/multiplayer' ? true : isPublic}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
