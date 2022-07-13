import clsx from 'clsx';
import * as React from 'react';

import { usePreferenceContext } from '@/context/PreferenceProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const {
    preferences: { theme, fontFamily },
  } = usePreferenceContext();
  return (
    <div
      className={clsx(
        theme,
        fontFamily,
        'sm:scrollbar h-screen w-full overflow-y-scroll bg-bg transition-colors duration-300'
      )}
    >
      <div className='layout bg-transparent'>{children}</div>
    </div>
  );
}
