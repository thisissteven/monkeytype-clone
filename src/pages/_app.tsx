import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/theme.css';

import CommandPalette from '@/components/CommandPalette';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import PreferenceProvider from '@/context/PreferenceProvider';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const results = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
  {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
  },
];

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PreferenceProvider>
      <CommandPalette results={results} />
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
