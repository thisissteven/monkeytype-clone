import * as React from 'react';

export default function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[18px] items-center rounded-sm bg-font px-1 text-sm font-medium text-bg'>
      {children}
    </div>
  );
}
