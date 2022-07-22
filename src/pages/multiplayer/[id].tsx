import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/layout/AnimateFade';
import Multiplayer from '@/components/multiplayer/Multiplayer';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';

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

export default function MultiplayerPage() {
  const {
    room: {
      socket,
      user: { username },
    },
    dispatch,
  } = useRoomContext();

  const { query } = useRouter();

  React.useEffect(() => {
    socket.emit('join room', { roomId: query?.id, username });
    dispatch({ type: 'SET_ROOM_ID', payload: query?.id as string });

    socket.off('notify').on('notify', (msg: string) => {
      toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        toastId: msg,
      });
    });

    socket.off('set room owner').on('set room owner', () => {
      dispatch({ type: 'SET_ROOM_OWNER', payload: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <AnimateFade>
      <Seo title='Monkeytype Clone' />

      <main>
        <section>
          <div className='layout flex flex-col items-center pt-28 text-center'>
            <Multiplayer />

            <div className='mt-8 flex flex-col items-center justify-center gap-2 font-primary'>
              <div className='flex items-center space-x-2 text-sm'>
                <Kbd>tab</Kbd>
                <span className='text-hl'> + </span>
                <Kbd>enter</Kbd>
                <span className='text-hl'>
                  {' '}
                  - restart test{' '}
                  <span className='text-xs text-fg'>(owner only)</span>{' '}
                </span>
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <Kbd>ctrl/cmd</Kbd>
                <span className='text-hl'> + </span>
                <Kbd>k</Kbd>
                <span className='text-hl'> or </span>
                <Kbd>p</Kbd>
                <span className='text-hl'> - command palette </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
