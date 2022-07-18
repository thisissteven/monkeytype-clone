import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { MdClose } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import '@/styles/theme.css';
import 'react-toastify/dist/ReactToastify.css';

import client from '@/lib/apolloClient';

import commands from '@/data/commands';

import CommandPalette from '@/components/CommandPalette/CommandPalette';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import PreferenceProvider from '@/context/Preference/PreferenceContext';
import { AuthProvider } from '@/context/User/UserContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PreferenceProvider>
      <CommandPalette data={commands} />
      <ApolloProvider client={client}>
        <AuthProvider>
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
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </PreferenceProvider>
  );
}

export default MyApp;
