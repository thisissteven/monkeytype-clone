import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BsCursorFill, BsFlagFill } from 'react-icons/bs';
import useTyping from 'react-typing-game-hook';

import Tooltip from '@/components/Tooltip';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';
import { useRoomContext } from '@/context/Room/RoomContext';

import Players from './Players';
import Code from './RoomCode';

type TypingInputProps = React.ComponentPropsWithRef<'input'>;

const TypingInput = React.forwardRef<HTMLInputElement, TypingInputProps>(
  ({ className }, ref) => {
    const [duration, setDuration] = useState(() => 0);
    const [isFocused, setIsFocused] = useState(() => false);
    const letterElements = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line unused-imports/no-unused-vars
    const [currentTime, setCurrentTime] = useState(() => Date.now());

    const {
      preferences: { isOpen },
    } = usePreferenceContext();

    const {
      room: {
        text,
        isPlaying,
        isFinished,
        socket,
        winner,
        user: { roomId, id },
      },
      dispatch,
    } = useRoomContext();

    React.useEffect(() => {
      let progress = Math.floor(((currIndex + 1) / text.length) * 100);
      const wpm =
        duration === 0
          ? Math.ceil(((60 / currentTime) * correctChar) / 5)
          : Math.ceil(((60 / duration) * correctChar) / 5);

      if (isFinished) {
        progress = 100;
        !winner && socket.emit('end game', roomId);
      }

      dispatch({ type: 'SET_STATUS', payload: { wpm, progress } });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, isFinished]);

    const {
      states: {
        charsState,
        currIndex,
        phase,
        correctChar,
        errorChar,
        startTime,
        endTime,
      },
      actions: { insertTyping, deleteTyping, resetTyping, endTyping },
    } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

    const [margin, setMargin] = useState(() => 0);
    const [value, setValue] = useState(() => '');

    // set cursor
    const pos = useMemo(() => {
      if (text.length !== 0 && currIndex + 1 === text.length) {
        dispatch({ type: 'SET_IS_FINISHED', payload: true });
      }
      if (currIndex !== -1 && letterElements.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spanref: any = letterElements.current.children[currIndex];

        const left = spanref.offsetLeft + spanref.offsetWidth - 2;
        const top = spanref.offsetTop - 2;
        if (top > 60) {
          setMargin((margin) => margin + 1);
          return {
            left,
            top: top / 2,
          };
        }
        return { left, top };
      } else {
        return {
          left: -2,
          top: 2,
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currIndex, text.length]);

    useEffect(() => {
      if (id && roomId) {
        socket.off('words generated').on('words generated', (text: string) => {
          dispatch({ type: 'SET_TEXT', payload: text });
          setValue('');
          setMargin(0);
          setCurrentTime(Date.now());
          endTyping();
          resetTyping();
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, roomId]);

    //set WPM
    useEffect(() => {
      if (phase === 2 && endTime && startTime) {
        const dur = Math.floor((endTime - startTime) / 1000);
        setDuration(dur);
      } else {
        setDuration(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, startTime, endTime, ref]);

    //handle key presses
    const handleKeyDown = (letter: string, control: boolean) => {
      if (letter === 'Backspace') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spanref: any = letterElements?.current?.children[currIndex];
        const top = spanref?.offsetTop - 2;

        if (top < 0) {
          return;
        }
        deleteTyping(control);
      } else if (letter.length === 1) {
        insertTyping(letter);
      }
    };

    useEffect(() => {
      const timerInterval = setInterval(() => {
        if (startTime) {
          setCurrentTime(() => Math.floor((Date.now() - startTime) / 1000));
        }
      }, 1000);
      if (phase === 2) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, [startTime, phase]);

    return (
      <>
        <Code />
        <Players />

        <div className='relative w-full max-w-[950px]'>
          <div
            className={clsx(
              'pointer-events-none fixed inset-0 h-screen w-screen bg-bg transition-opacity duration-200',
              { 'opacity-0': !isFocused },
              className
            )}
          ></div>
          <span className='absolute left-0 -top-[4rem] flex items-center gap-2 text-4xl text-fg/80'>
            <span className='inline-block w-20 rounded-sm bg-font/40 px-2 py-1 text-left'>
              {currIndex + 1}
            </span>{' '}
            /{' '}
            {!text.length ? (
              <div className='flex flex-col gap-1'>
                <span className='inline-block h-3 w-12 animate-pulse rounded-lg bg-fg/50'></span>
                <span className='inline-block h-3 w-16 animate-pulse rounded-lg bg-fg/50'></span>
              </div>
            ) : (
              text.length
            )}
          </span>

          <div
            className={clsx('relative h-[140px] w-full text-2xl outline-none')}
            onClick={() => {
              if (!isPlaying) return;
              if (ref != null && typeof ref !== 'function') {
                ref?.current?.focus();
                setIsFocused(true);
              }
            }}
          >
            <input
              type='text'
              className='absolute left-0 top-0 z-20 h-full w-full cursor-default opacity-0'
              tabIndex={isPlaying ? 1 : -1}
              ref={ref}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              onChange={(e) => {
                setValue((prev) => {
                  if (prev.length > e.target.value.length) {
                    handleKeyDown('Backspace', false);
                  } else {
                    handleKeyDown(e.target.value.slice(-1), false);
                  }
                  return e.target.value;
                });
              }}
              onKeyDown={(e) => {
                if (isOpen) {
                  setIsFocused(false);
                  return;
                }
                if (e.ctrlKey) return;
                if (
                  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(
                    e.key
                  )
                )
                  e.preventDefault();
              }}
            />
            <div
              className={clsx(
                'absolute -top-4 z-10 h-4 w-full bg-gradient-to-b from-bg transition-all duration-200',
                { 'opacity-0': !isFocused }
              )}
            ></div>
            <div
              className={clsx(
                'absolute -bottom-1 z-10 h-8 w-full bg-gradient-to-t from-bg transition-all duration-200',
                { 'opacity-0': !isFocused }
              )}
            ></div>

            {isPlaying ? (
              <span
                className={clsx(
                  'absolute z-20 flex h-full w-full cursor-default items-center justify-center text-base opacity-0 transition-all duration-200',
                  { 'text-fg opacity-100 ': !isFocused }
                )}
              >
                Click
                <BsCursorFill className='mx-2 scale-x-[-1]' />
                or press any key to focus
              </span>
            ) : (
              <span
                className={clsx(
                  'absolute z-20 flex h-full w-full cursor-default items-center justify-center text-base opacity-0 transition-all duration-200',
                  { 'text-fg opacity-100 ': !isFocused }
                )}
              >
                {' '}
                Game will start when everyone is ready
              </span>
            )}
            <div
              className={clsx(
                'absolute top-0 left-0 mb-4 h-full w-full overflow-hidden text-justify leading-relaxed tracking-wide transition-all duration-200',
                { 'opacity-40 blur-[8px]': !isFocused }
              )}
            >
              <div
                ref={letterElements}
                style={
                  margin > 0
                    ? {
                        marginTop: -(margin * 39),
                      }
                    : {
                        marginTop: 0,
                      }
                }
              >
                {text.split('').map((letter, index) => {
                  const state = charsState[index];
                  const color =
                    state === 0 || index > currIndex
                      ? 'text-font'
                      : state === 1
                      ? 'text-fg'
                      : 'text-hl border-b-2 border-hl';
                  return (
                    <span
                      key={letter + index}
                      className={`${color} ${
                        state === 0 &&
                        index < currIndex &&
                        'border-b-2 border-hl text-hl'
                      }`}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            </div>
            {isFocused ? (
              <span
                style={{
                  left: pos.top < 0 ? -2 : pos.left,
                  top: pos.top < 0 ? 2 : pos.top + 2,
                }}
                className={clsx('caret text-hl', {
                  '-mt-[2px]': currIndex === -1,
                  'animate-blink': phase === 0,
                })}
              >
                {phase === 2 ? (
                  <div className='group relative z-40'>
                    <Tooltip
                      className='bg-fg text-bg group-hover:translate-y-0 group-hover:opacity-100'
                      triangle='bg-fg'
                    >
                      You finished here.
                    </Tooltip>
                    <BsFlagFill className='-mb-[8px] text-fg' />
                  </div>
                ) : (
                  '|'
                )}
              </span>
            ) : null}
          </div>
          <div className='relative mt-4 flex w-full flex-col flex-wrap items-center justify-center gap-4 text-sm'>
            {phase === 2 && startTime && endTime ? (
              <div className='grid grid-rows-3 items-center gap-4 rounded-lg px-4 py-1 text-xl font-bold sm:flex'>
                <span>
                  WPM: {Math.ceil(((60 / duration) * correctChar) / 5)}
                </span>
                <span>
                  Accuracy:{' '}
                  {(
                    ((correctChar - errorChar) / (currIndex + 1)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
                <span>Duration: {duration}s</span>
              </div>
            ) : null}
            <div className='flex gap-4'></div>
          </div>
        </div>
      </>
    );
  }
);

export default TypingInput;
