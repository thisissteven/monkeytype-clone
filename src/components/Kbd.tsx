import * as React from 'react';

export default function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center rounded-sm border-b-2 border-font bg-hl px-1 text-sm font-medium text-bg'>
      {children}
    </div>
  );
}
