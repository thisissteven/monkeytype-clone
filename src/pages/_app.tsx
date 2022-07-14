import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/theme.css';

import commands from '@/data/commands';

import CommandPalette from '@/components/CommandPalette/CommandPalette';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import PreferenceProvider from '@/context/Preference/PreferenceContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PreferenceProvider>
      <CommandPalette data={commands} />
      <Layout>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </PreferenceProvider>
  );
}

export default MyApp;
