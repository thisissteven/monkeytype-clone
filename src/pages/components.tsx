// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { usePreferenceContext } from '@/context/PreferenceProvider';

type Theme = typeof themeList[number];

export default function ComponentsPage() {
  const {
    preferences: { theme },
    dispatch,
  } = usePreferenceContext();

  React.useEffect(() => {
    if (typeof window !== undefined) {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <Layout>
      <Seo
        templateTitle='Components'
        description='Pre-built components with awesome default'
      />

      <main>
        <section className='bg-bg/20'>
          <div className={clsx('layout min-h-screen py-20')}>
            <h1>Components</h1>
            <ArrowLink direction='left' className='mt-2 text-font' href='/'>
              Back to Home
            </ArrowLink>

            <ol className='mt-8 space-y-6'>
              <li className='space-y-4'>
                <h2 className='text-lg md:text-xl'>Color Palette</h2>
                <div className='flex flex-wrap gap-2'>
                  <select
                    name='theme'
                    id='theme'
                    value={theme}
                    className={clsx(
                      'block max-w-xs rounded',
                      'border-none bg-bg/50 text-fg',
                      'focus:border-bg focus:outline-none focus:ring focus:ring-bg'
                    )}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_THEME',
                        payload: e.target.value as Theme,
                      })
                    }
                  >
                    {themeList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-wrap gap-2 text-xs font-medium'>
                  <div className='h-8 w-20 rounded bg-bg text-black' />
                  <div className='h-8 w-20 rounded bg-font text-black' />
                  <div className='h-8 w-20 rounded bg-hl text-black' />
                  <div className='h-8 w-20 rounded bg-fg text-black' />
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const themeList = [
  'default',
  'winter',
  'taro',
  'green-tea',
  'wood',
  'eye-pain',
] as const;
