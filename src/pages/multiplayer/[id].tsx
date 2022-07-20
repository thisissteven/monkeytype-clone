/* eslint-disable no-console */
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';
import io from 'socket.io-client';

import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function MultiplayerPage() {
  React.useEffect(() => {
    fetch('/api/socket').finally(() => {
      const socket = io();

      socket.on('connect', () => {
        console.log('connect');
        socket.emit('hello');
      });

      socket.on('hello', (data) => {
        console.log('hello', data);
      });

      socket.on('a user connected', () => {
        console.log('a user connected');
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });
    });
  }, []);
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section>
          <div className='layout flex min-h-[80vh] flex-col items-center justify-center text-center'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-font'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Multiplayer</h1>
            <ArrowLink className='mt-4 text-font md:text-lg' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
}
