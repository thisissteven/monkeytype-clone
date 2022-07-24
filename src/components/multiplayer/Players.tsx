import clsx from 'clsx';
import * as React from 'react';

import { useRoomContext } from '@/context/Room/RoomContext';

export default function Players() {
  const {
    room: {
      user: { id },
      players,
    },
  } = useRoomContext();

  return (
    <>
      <div
        className={clsx(
          'z-20 -mt-16 mb-24 flex w-full max-w-[950px] flex-wrap items-center gap-x-8 gap-y-4 font-primary transition-colors duration-200 hover:text-hl'
        )}
      >
        {players.map((player) =>
          player.id === id ? (
            <div
              key={player.id}
              className='flex flex-1 flex-col items-start gap-2'
            >
              <div className='flex w-full items-center justify-between'>
                <span className='text-fg'>
                  You{' '}
                  <span className='text-xs'>
                    ({player.isReady ? 'ready' : 'not ready'})
                  </span>
                </span>
                <span className='text-sm text-fg'>{player.status.wpm} wpm</span>
              </div>
              <div className='h-2 w-full min-w-[250px] overflow-hidden rounded-lg bg-hl/40 xs:min-w-[350px]'>
                <div
                  className='h-full rounded-lg bg-fg transition-all duration-500'
                  style={{
                    width: `${player.status.progress}%`,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div
              key={player.id}
              className='flex flex-1 flex-col items-start gap-2'
            >
              <div className='flex w-full items-center justify-between'>
                <span className='text-fg/50'>
                  {player.username}{' '}
                  <span className='text-xs'>
                    ({player.isReady ? 'ready' : 'not ready'})
                  </span>
                </span>
                <span className='text-sm text-fg/50'>
                  {player.status.wpm} wpm
                </span>
              </div>
              <div className='h-2 w-full min-w-[250px] overflow-hidden rounded-lg bg-hl/20 xs:min-w-[350px]'>
                <div
                  className='h-full rounded-lg bg-fg/60 transition-all duration-500'
                  style={{
                    width: `${player.status.progress}%`,
                  }}
                ></div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
