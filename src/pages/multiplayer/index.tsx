import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { createRoom } from '@/lib/socket/roomHandler';

import Input from '@/components/Input';
import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/layout/AnimateFade';
import Seo from '@/components/Seo';

import { useRoomContext } from '@/context/Room/RoomContext';

const schema = yup.object().shape({
  code: yup
    .string()
    .required('code is required')
    .length(6, 'code must be 6 characters long'),
});

export default function MultiplayerPage() {
  const methods = useForm<{ code: string }>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const {
    room: { socket },
  } = useRoomContext();

  const router = useRouter();

  const [isCreatingRoom, setIsCreatingRoom] = React.useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = React.useState(false);

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
        toast.success('Room successfully created!', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'create-room',
          autoClose: 3000,
        });
        setIsCreatingRoom(false);
        router.push(`/multiplayer/${roomId}`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = ({ code }: { code: string }) => {
    setIsJoiningRoom(true);
    router.push(`/multiplayer/${code}`);
  };

  return (
    <AnimateFade>
      <Seo title='Enter Room Code' />

      <main>
        <section>
          <div className='layout flex min-h-[65vh] flex-col items-center pt-28 text-center font-primary'>
            <div className='h-20rem flex flex-col gap-4'>
              <h1 className='mb-2'>multiplayer mode</h1>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex w-full justify-center gap-2'>
                    <Input
                      name='code'
                      id='code'
                      autoComplete='off'
                      placeholder='enter room code'
                      className='flex-1 rounded-r-none'
                    />
                    <button
                      disabled={isJoiningRoom}
                      type='submit'
                      className={`grid h-[42px] w-12 place-items-center rounded-r-lg bg-fg transition-colors duration-200 hover:bg-fg/90 active:bg-fg/80 ${
                        isJoiningRoom && 'cursor-not-allowed'
                      }`}
                    >
                      <FaArrowRight className='text-bg' />
                    </button>
                  </div>
                </form>
              </FormProvider>
              <h2>or</h2>
              <div>
                <button
                  onClick={() => {
                    setIsCreatingRoom(true);
                    createRoom(socket);
                  }}
                  disabled={isCreatingRoom}
                  className={`outline-solid active:bg-fg-80 mb-8 transform rounded-lg bg-fg px-3 py-2 font-primary text-bg shadow-b shadow-fg/50 outline-offset-[6px] transition-all duration-200 hover:bg-fg/90 focus:outline-dashed focus:outline-[3px] focus:outline-fg/50 active:translate-y-[4px] active:shadow-none ${
                    isCreatingRoom && 'cursor-not-allowed'
                  }`}
                >
                  {isCreatingRoom ? (
                    <span className='flex items-center text-bg'>
                      Creating room
                      <CgSpinner className='ml-2 animate-spin' />
                    </span>
                  ) : (
                    'Create Room'
                  )}
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
