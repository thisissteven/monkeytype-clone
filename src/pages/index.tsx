import * as React from 'react';

import Kbd from '@/components/Kbd';
import Seo from '@/components/Seo';
import Box from '@/components/words/Box';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title='Monkeytype Clone' />

      <main>
        <section>
          <div className='layout flex flex-col items-center pt-28 text-center'>
            <Box />

            <div className='mt-8 flex flex-col items-center justify-center gap-2'>
              <div className='flex items-center space-x-2 text-sm font-light'>
                <Kbd>tab</Kbd>
                <span> + </span>
                <Kbd>enter</Kbd>
                <span> - restart test </span>
              </div>
              <div className='flex items-center space-x-2 text-sm font-light'>
                <Kbd>ctrl/cmd</Kbd>
                <span> + </span>
                <Kbd>k</Kbd>
                <span> or </span>
                <Kbd>p</Kbd>
                <span> - command palette </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
