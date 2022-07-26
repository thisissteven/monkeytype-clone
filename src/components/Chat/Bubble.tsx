import * as React from 'react';

type BubbleProps = {
  username?: string;
  value: string;
  isYou?: boolean;
};

const Bubble: React.FC<BubbleProps> = ({ username, value, isYou }) =>
  isYou ? (
    <span className='text-normal mt-2 max-w-[70%] self-end rounded-lg bg-hl px-2 py-1 text-left text-sm text-fg'>
      <span className='text-bg'>{value}</span>
    </span>
  ) : (
    <span className='text-normal mt-1 w-full text-left text-sm text-fg'>
      <span>{username}: </span>
      {value}
    </span>
  );

export default Bubble;
