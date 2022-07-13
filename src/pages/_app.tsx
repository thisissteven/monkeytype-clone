import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/theme.css';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

import PreferenceProvider from '@/context/PreferenceProvider';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PreferenceProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </PreferenceProvider>
  );
}

export default MyApp;
