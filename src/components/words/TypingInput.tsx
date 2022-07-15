import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTyping from 'react-typing-game-hook';

type TypingInputProps = {
  text: string;
  time: string;
} & React.ComponentPropsWithRef<'div'>;

const TypingInput = React.forwardRef<HTMLDivElement, TypingInputProps>(
  ({ text, time }, ref) => {
    const [duration, setDuration] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const letterElements = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState(() => parseInt(time));

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
    } = useTyping(text, { skipCurrentWordOnSpace: true, pauseOnError: false });

    // set cursor
    const pos = useMemo(() => {
      if (currIndex !== -1 && letterElements.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const spanref: any = letterElements.current.children[currIndex];
        const left = spanref.offsetLeft + spanref.offsetWidth - 2;
        const top = spanref.offsetTop - 2;
        return { left, top };
      } else {
        return {
          left: -2,
          top: 2,
        };
      }
    }, [currIndex]);

    useEffect(() => {
      setTimeLeft(parseInt(time));
      endTyping();
      resetTyping();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, time]);

    // handle timer
    useEffect(() => {
      const timerInterval = setInterval(() => {
        if (phase === 1) {
          setTimeLeft((timeLeft) => {
            if (timeLeft === 1) {
              clearInterval(timerInterval);
              endTyping();
            }
            return timeLeft - 1;
          });
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }, [endTyping, phase]);

    //set WPM
    useEffect(() => {
      if (phase === 2 && endTime && startTime) {
        setDuration(Math.floor((endTime - startTime) / 1000));
      } else {
        setDuration(0);
      }
    }, [phase, startTime, endTime]);

    //handle key presses
    const handleKeyDown = (letter: string, control: boolean) => {
      if (letter === 'Escape') {
        resetTyping();
      } else if (letter === 'Backspace') {
        deleteTyping(control);
      } else if (letter.length === 1) {
        insertTyping(letter);
      }
    };

    return (
      <div className='relative w-full max-w-[950px]'>
        <span className='absolute left-0 -top-14 text-4xl text-fg/80'>
          {timeLeft}
        </span>
        <div
          tabIndex={1}
          ref={ref}
          onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className='relative h-[140px] w-full max-w-[950px] overflow-hidden text-2xl outline-none'
        >
          <div className='absolute bottom-0 z-10 h-8 w-full bg-gradient-to-t from-bg'></div>
          <div
            ref={letterElements}
            className='pointer-events-none absolute top-0 left-0 mb-4 w-full text-justify leading-relaxed tracking-wide'
          >
            {text.split('').map((letter, index) => {
              const state = charsState[index];
              const color =
                state === 0 ? 'text-font' : state === 1 ? 'text-fg' : 'text-hl';
              return (
                <span
                  key={letter + index}
                  className={`${color} ${letter === ' ' && ''}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          {phase !== 2 && isFocused ? (
            <span
              style={{
                left: pos.left,
                top: pos.top + 2,
              }}
              className={clsx('caret text-hl', {
                '-mt-[2px]': currIndex === -1,
                'animate-blink': phase === 0,
              })}
            >
              |
            </span>
          ) : null}
        </div>
        <p className='mt-4 text-sm'>
          {phase === 2 && startTime && endTime ? (
            <>
              <span className='mr-4 text-green-500'>
                WPM: {Math.round(((60 / duration) * correctChar) / 5)}
              </span>
              <span className='mr-4 text-blue-500'>
                Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
              </span>
              <span className='mr-4 text-yellow-500'>
                Duration: {duration}s
              </span>
            </>
          ) : null}
          <span className='mr-4'> Current Index: {currIndex}</span>
          <span className='mr-4'> Correct Characters: {correctChar}</span>
          <span className='mr-4'> Error Characters: {errorChar}</span>
        </p>
      </div>
    );
  }
);

export default TypingInput;
