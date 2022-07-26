import * as React from 'react';

type BubbleProps = {
  username?: string;
  value: string;
  isYou?: boolean;
  type: 'notification' | 'message';
};

const Bubble: React.FC<BubbleProps> = ({ username, value, isYou, type }) =>
  type === 'message' ? (
    isYou ? (
      <span className='text-normal mt-2 max-w-[70%] self-end rounded-lg bg-hl px-2 py-1 text-left text-sm text-fg'>
        <span className='text-bg'>{value}</span>
      </span>
    ) : (
      <span className='text-normal mt-1 w-full text-left text-sm text-fg'>
        <span>{username}: </span>
        {value}
      </span>
    )
  ) : (
    <span className='text-normal mt-2 w-full text-center text-sm'>
      {isYou ? (
        <span className={`${value === 'joined' ? 'text-hl' : 'text-fg'}`}>
          You {value} the room.
        </span>
      ) : (
        <span className={`${value === 'joined' ? 'text-hl' : 'text-fg'}`}>
          {username} {value} the room.
        </span>
      )}
    </span>
  );

export default Bubble;
