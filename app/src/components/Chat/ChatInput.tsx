import * as React from 'react';
import { IoMdSend } from 'react-icons/io';

import { useRoomContext } from '@/context/Room/RoomContext';

const ChatInput = ({ isPublic }: { isPublic: boolean }) => {
  const {
    room: {
      socket,
      user: { username, roomId, id },
    },
  } = useRoomContext();

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(e: any) => {
        e.preventDefault();
        const { value } = e.target[0];
        if (!value) return;
        e.target[0].value = '';
        if (isPublic) {
          socket.emit('send chat', { username, value, roomId: 'public', id });
          return;
        }
        socket.emit('send chat', { username, value, roomId, id });
      }}
      className='relative mx-auto w-full xs:pr-4'
    >
      <input
        placeholder='type to chat'
        type='text'
        className='w-full border-x-0 border-b border-t-0 border-fg bg-transparent font-normal text-fg placeholder:text-fg/50 focus:border-fg focus:outline-0 focus:ring-0'
      />
      <button
        className='absolute right-0 h-full border-b border-fg bg-bg px-2 text-sm font-normal xs:right-4'
        type='submit'
      >
        <span className='flex items-center text-fg transition-opacity duration-200 hover:text-opacity-80 active:text-opacity-70'>
          Send <IoMdSend className='ml-1' />
        </span>
      </button>
    </form>
  );
};

export default ChatInput;
