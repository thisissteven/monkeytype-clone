import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MdClose } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import '@/styles/theme.css';
import 'react-toastify/dist/ReactToastify.css';

import commands from '@/data/commands';

import CommandPalette from '@/components/CommandPalette/CommandPalette';
import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import { ChatProvider } from '@/context/Chat/ChatContext';
import PreferenceProvider from '@/context/Preference/PreferenceContext';
import { RoomProvider } from '@/context/Room/RoomContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <PreferenceProvider>
      <CommandPalette data={commands} />
      <SessionProvider session={session}>
        <Layout>
          <ToastContainer
            toastClassName={() =>
              'relative flex p-1 mt-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-hl text-bg border-2 border-hl mx-4'
            }
            bodyClassName={() =>
              'flex px-2 py-2 text-sm font-primary block accent-hl'
            }
            closeButton={() => (
              <MdClose className='text-bg/80 transition-colors duration-200 hover:text-bg' />
            )}
          />
          <Header />
          <RoomProvider>
            <ChatProvider>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </ChatProvider>
          </RoomProvider>
        </Layout>
      </SessionProvider>
    </PreferenceProvider>
  );
}

export default MyApp;
