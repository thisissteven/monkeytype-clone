// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

type Theme = typeof themeList[number];
type FontFamily = typeof fontFamilyList[number];

export default function ComponentsPage() {
  const {
    preferences: { theme, fontFamily },
    dispatch,
  } = usePreferenceContext();

  return (
    <AnimateFade>
      <Seo title='Components' />

      <main>
        <section>
          <div className={clsx('layout min-h-screen py-10')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
              Back to Home
            </ArrowLink>
            <h1>Components</h1>

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
                      'border-none bg-fg text-bg',
                      'focus:border-bg focus:outline-none focus:ring focus:ring-bg',
                      'font-primary'
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
                  <div className='flex flex-col gap-1 text-center'>
                    <div className='h-8 w-20 rounded border-2 border-font bg-bg text-black'></div>
                    <p>bg</p>
                  </div>
                  <div className='flex flex-col gap-1 text-center'>
                    <div className='h-8 w-20 rounded bg-font text-black'></div>
                    <p>font</p>
                  </div>
                  <div className='flex flex-col gap-1 text-center'>
                    <div className='h-8 w-20 rounded bg-hl text-black'></div>
                    <p>hl</p>
                  </div>
                  <div className='flex flex-col gap-1 text-center'>
                    <div className='h-8 w-20 rounded bg-fg text-black'></div>
                    <p>fg</p>
                  </div>
                </div>
              </li>
            </ol>

            <ol className='mt-8 space-y-6'>
              <li className='space-y-4'>
                <h2 className='text-lg md:text-xl'>Font Family</h2>
                <div className='flex flex-wrap gap-2'>
                  <select
                    name='font-family'
                    id='font-family'
                    value={fontFamily}
                    className={clsx(
                      'block max-w-xs rounded',
                      'border-none bg-fg text-bg',
                      'focus:border-bg focus:outline-none focus:ring focus:ring-bg',
                      'font-primary'
                    )}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FONT_FAMILY',
                        payload: e.target.value as FontFamily,
                      })
                    }
                  >
                    {fontFamilyList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-wrap gap-2 text-xs font-medium'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex w-full flex-col items-start justify-between text-sm sm:flex-row sm:items-center sm:gap-2'>
                      <span className='mr-4 font-bold text-fg'>text-sm</span>
                      <p>The quick brown fox ...</p>
                    </div>
                    <div className='flex w-full flex-col items-start justify-between text-base sm:flex-row sm:items-center sm:gap-2'>
                      <span className='mr-4 font-bold text-fg'>text-base</span>
                      <p>The quick brown fox ...</p>
                    </div>
                    <div className='flex w-full flex-col items-start justify-between text-lg sm:flex-row sm:items-center sm:gap-2'>
                      <span className='mr-4 font-bold text-fg'>text-lg</span>
                      <p>The quick brown fox ...</p>
                    </div>
                    <div className='flex w-full flex-col items-start justify-between text-xl sm:flex-row sm:items-center sm:gap-2'>
                      <span className='mr-4 font-bold text-fg'>text-xl</span>
                      <p>The quick brown fox ...</p>
                    </div>
                    <div className='flex w-full flex-col items-start justify-between text-2xl sm:flex-row sm:items-center sm:gap-2'>
                      <span className='mr-4 font-bold text-fg'>text-2xl</span>
                      <p>The quick brown fox ...</p>
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}

const themeList = [
  'default',
  'winter',
  'taro',
  'green-tea',
  'wood',
  'beach',
  'halloween',
  'spring',
  'eye-pain',
] as const;

const fontFamilyList = ['inter', 'poppins', 'chakra-petch'] as const;
