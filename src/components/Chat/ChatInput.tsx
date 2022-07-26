import * as React from 'react';

import { useRoomContext } from '@/context/Room/RoomContext';

const ChatInput = () => {
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
        socket.emit('send chat', { username, value, roomId, id });
      }}
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
  );
};

export default ChatInput;
