import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { createRoom } from '@/lib/socket/roomHandler';

import Input from '@/components/Input';
import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/layout/AnimateFade';
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
  const methods = useForm<{ code: string }>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const {
    room: { socket },
    dispatch,
  } = useRoomContext();

  const router = useRouter();

  React.useEffect(() => {
    socket.emit('hi', 'hello');

    // create another room id if already exist
    socket.off('room already exist').on('room already exist', () => {
      createRoom(socket);
    });

    // on create room success, redirect to that room
    socket
      .off('create room success')
      .on('create room success', (roomId: string) => {
        dispatch({ type: 'SET_ROOM_OWNER', payload: true });
        toast.success('Room successfully created!', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'create-room',
        });
        router.push(`/multiplayer/${roomId}`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = ({ code }: { code: string }) => {
    router.push(`/multiplayer/${code}`);
  };

  return (
    <AnimateFade>
      <Seo title='Enter Room Code' />

      <main>
        <section>
          <div className='layout flex min-h-[65vh] flex-col items-center pt-28 text-center font-primary'>
            <div className='flex h-[40vh] flex-col gap-4'>
              <h1 className='mb-2'>multiplayer mode</h1>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='relative'>
                  <Input
                    name='code'
                    id='code'
                    autoComplete='off'
                    placeholder='enter room code'
                  />
                  <button
                    type='submit'
                    className='active:bg-bg-/20 absolute right-0 top-0 grid h-[42px] w-12 place-items-center rounded-r-lg bg-font/0 transition-colors duration-200 hover:bg-bg/20 active:bg-bg/30'
                  >
                    <FaArrowRight className='text-bg' />
                  </button>
                </form>
              </FormProvider>
              <h2>or</h2>
              <div>
                <button
                  onClick={() => createRoom(socket)}
                  className='active:bg-hl-80 transform rounded-lg bg-hl px-3 py-2 text-bg shadow-b shadow-font transition-all duration-200 hover:bg-hl/90 focus:outline-0 active:translate-y-[4px] active:shadow-none'
                >
                  Create Room
                </button>
              </div>
            </div>
            <div className='mt-8 flex items-center space-x-2 text-sm'>
              <Kbd>ctrl/cmd</Kbd>
              <span className='text-hl'> + </span>
              <Kbd>k</Kbd>
              <span className='text-hl'> or </span>
              <Kbd>p</Kbd>
              <span className='text-hl'> - command palette </span>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
