import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaArrowRight } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { createRoom } from '@/lib/socket/roomHandler';

import Button from '@/components/Button/Button';
import ChatBox from '@/components/Chat/ChatBox';
import Input from '@/components/Input';
import AnimateFade from '@/components/Layout/AnimateFade';
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
    room: { socket, mode },
    dispatch,
    resetTime,
  } = useRoomContext();

  const router = useRouter();

  const [isCreatingRoom, setIsCreatingRoom] = React.useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = React.useState(false);

  React.useEffect(() => {
    socket.emit('hi', 'hello');

    // create another room id if already exist
    socket.off('room already exist').on('room already exist', () => {
      createRoom(socket, mode);
    });

    socket.off('end game').on('end game', () => {
      dispatch({ type: 'SET_STATUS', payload: { progress: 0, wpm: 0 } });
      dispatch({ type: 'SET_IS_READY', payload: false });
      dispatch({ type: 'SET_IS_PLAYING', payload: false });
      dispatch({ type: 'SET_IS_FINISHED', payload: false });
      dispatch({ type: 'SET_WINNER', payload: null });
      resetTime(0);
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
        dispatch({ type: 'SET_IS_OWNER', payload: true });
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
          <div className='layout flex min-h-[65vh] w-full flex-col items-center pt-10 text-center font-primary'>
            <div className='relative mb-8 flex h-8 w-full max-w-[800px] items-center justify-between'>
              <ChatBox
                className='right-3 w-[calc(100%+0.5rem)] sm:right-2'
                label='public chat'
              />
            </div>
            <div className='flex w-full flex-col gap-4'>
              <RiTeamFill className='self-center text-[5rem] text-fg' />
              <h1 className='mb-2'>multiplayer mode</h1>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mx-auto -mb-2 flex max-w-[330px] justify-center gap-2'>
                    <Input
                      name='code'
                      id='code'
                      autoComplete='off'
                      placeholder='enter room code'
                      className='flex-1 rounded-r-none'
                    />
                    <Button
                      disabled={isJoiningRoom}
                      type='submit'
                      className={`grid h-[42px] w-12 place-items-center rounded-l-none ${
                        isJoiningRoom && 'cursor-not-allowed'
                      }`}
                    >
                      <FaArrowRight className='text-bg' />
                    </Button>
                  </div>
                </form>
              </FormProvider>

              <span className='mb-4 text-3xl font-bold'>or</span>
              <div className='mx-auto mb-4 flex space-x-2 font-primary'>
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_MODE', payload: 'words' })
                  }
                  className={clsx(
                    'rounded-lg px-2 py-1 transition-colors duration-200',
                    [mode === 'words' ? 'text-hl ring-2 ring-fg' : 'text-hl']
                  )}
                >
                  words
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_MODE', payload: 'sentences' })
                  }
                  className={clsx(
                    'rounded-lg px-2 py-1 transition-colors duration-200',
                    [
                      mode === 'sentences'
                        ? 'text-hl ring-2 ring-fg'
                        : 'text-hl',
                    ]
                  )}
                >
                  sentences
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'SET_MODE', payload: 'numbers' })
                  }
                  className={clsx(
                    'rounded-lg px-2 py-1 transition-colors duration-200',
                    [mode === 'numbers' ? 'text-hl ring-2 ring-fg' : 'text-hl']
                  )}
                >
                  numbers
                </button>
              </div>
              <div className='flex items-center justify-center space-x-4'>
                <Button
                  onClick={() => {
                    setIsCreatingRoom(true);
                    createRoom(socket, mode);
                  }}
                  disabled={isCreatingRoom}
                  className={`${isCreatingRoom && 'cursor-not-allowed'} mb-0`}
                >
                  {isCreatingRoom ? (
                    <span className='flex items-center text-bg'>
                      Creating room
                      <CgSpinner className='ml-2 animate-spin' />
                    </span>
                  ) : (
                    'Create New Room'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
