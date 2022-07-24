import * as React from 'react';

export default function Skeleton() {
  return (
    <div className='flex flex-1 animate-pulse flex-col items-start gap-2'>
      <div className='flex w-full items-center justify-between'>
        <span className='h-3 w-12 rounded-lg bg-fg/50'></span>
        <span className='h-2 w-8 rounded-lg bg-fg/50'></span>
      </div>
      <div className='h-2 w-full overflow-hidden'>
        <div
          className='h-full rounded-lg bg-fg/50 transition-all duration-500'
          style={{
            width: `100%`,
          }}
        ></div>
      </div>
    </div>
  );
}
