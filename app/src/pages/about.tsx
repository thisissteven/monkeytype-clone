import clsx from 'clsx';
import * as React from 'react';
import { SiNextdotjs, SiPrisma, SiReact, SiTailwindcss } from 'react-icons/si';

import Kbd from '@/components/Kbd';
import AnimateFade from '@/components/Layout/AnimateFade';
import ArrowLink from '@/components/Link/ArrowLink';
import UnderlineLink from '@/components/Link/UnderlineLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

const techs = [
  { icon: <SiNextdotjs />, key: 'nextjs' },
  { icon: <SiReact />, key: 'react' },
  { icon: <SiPrisma />, key: 'prisma' },
  { icon: <SiTailwindcss />, key: 'tailwind' },
];

type Theme = typeof themeList[number];
type FontFamily = typeof fontFamilyList[number];

export default function AboutPage() {
  const {
    preferences: { theme, fontFamily },
    dispatch,
  } = usePreferenceContext();

  return (
    <AnimateFade>
      <Seo title='About' />

      <main>
        <section>
          <div className={clsx('layout min-h-[60vh] pt-10')}>
            <div>
              <ArrowLink direction='left' className='my-4 text-hl' href='/'>
                <span className='text-hl'>back to home</span>
              </ArrowLink>
            </div>
            <div className='flex w-full flex-wrap gap-8 xs:whitespace-nowrap'>
              <div className='flex-1'>
                <h1 className='text-hl'>about</h1>
                <div className='mt-4'>
                  <p className='text-hl'>
                    this app is a clone of{' '}
                    <UnderlineLink
                      className='text-fg'
                      href='https://monkeytype.com'
                    >
                      monkeytype
                    </UnderlineLink>
                  </p>
                  <p className='my-4 text-hl'>tech stack:</p>
                  <div className='flex gap-4 text-4xl text-hl'>
                    {techs.map((tech) => (
                      <div className='group relative' key={tech.key}>
                        {tech.icon}
                        <Tooltip className='top-12 group-hover:translate-y-0 group-hover:opacity-100'>
                          {tech.key}
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </div>
                <p className='mt-4 mb-2 text-hl'>pages:</p>
                <ul className='space-y-1'>
                  <li>
                    <UnderlineLink className='text-fg' href='/'>
                      home
                    </UnderlineLink>
                  </li>
                  <li>
                    <UnderlineLink className='text-fg' href='/leaderboard'>
                      leaderboard
                    </UnderlineLink>
                  </li>
                  <li>
                    <UnderlineLink className='text-fg' href='/account'>
                      account
                    </UnderlineLink>
                  </li>
                  <li>
                    <UnderlineLink className='text-fg' href='/multiplayer'>
                      multiplayer
                    </UnderlineLink>
                  </li>
                </ul>

                <p className='mt-4 text-hl'>commands:</p>
                <div className='mt-4 flex flex-col justify-center gap-4 font-primary'>
                  <div className='flex items-center space-x-2 text-sm'>
                    <Kbd>tab</Kbd>
                    <span className='text-hl'> + </span>
                    <Kbd>enter</Kbd>
                    <span className='text-hl'> - restart test </span>
                  </div>
                  <div className='flex items-center space-x-2 text-sm'>
                    <Kbd>ctrl/cmd</Kbd>
                    <span className='text-hl'> + </span>
                    <Kbd>k</Kbd>
                    <span className='text-hl'> or </span>
                    <Kbd>p</Kbd>
                    <span className='text-hl'> - command palette </span>
                  </div>
                </div>
              </div>

              <div className='flex-1'>
                <h1>components</h1>

                <ol className='mt-4 space-y-6'>
                  <li className='space-y-4'>
                    <h2 className='text-lg md:text-xl'>color palette</h2>
                    <div className='flex flex-wrap gap-2'>
                      <select
                        name='theme'
                        id='theme'
                        value={theme}
                        className={clsx(
                          'block max-w-xs rounded text-sm',
                          'border-none bg-hl text-bg',
                          'focus:border-bg focus:outline-font focus:ring focus:ring-bg',
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
                    <h2 className='text-lg md:text-xl'>font family</h2>
                    <div className='flex flex-wrap gap-2'>
                      <select
                        name='font-family'
                        id='font-family'
                        value={fontFamily}
                        className={clsx(
                          'block max-w-xs rounded text-sm',
                          'border-none bg-hl text-bg',
                          'focus:border-bg focus:outline-font focus:ring focus:ring-bg',
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
                          <span className='mr-4 font-bold text-fg'>
                            text-sm
                          </span>
                          <p>The quick brown fox ...</p>
                        </div>
                        <div className='flex w-full flex-col items-start justify-between text-base sm:flex-row sm:items-center sm:gap-2'>
                          <span className='mr-4 font-bold text-fg'>
                            text-base
                          </span>
                          <p>The quick brown fox ...</p>
                        </div>
                        <div className='flex w-full flex-col items-start justify-between text-lg sm:flex-row sm:items-center sm:gap-2'>
                          <span className='mr-4 font-bold text-fg'>
                            text-lg
                          </span>
                          <p>The quick brown fox ...</p>
                        </div>
                        <div className='flex w-full flex-col items-start justify-between text-xl sm:flex-row sm:items-center sm:gap-2'>
                          <span className='mr-4 font-bold text-fg'>
                            text-xl
                          </span>
                          <p>The quick brown fox ...</p>
                        </div>
                        <div className='flex w-full flex-col items-start justify-between text-2xl sm:flex-row sm:items-center sm:gap-2'>
                          <span className='mr-4 font-bold text-fg'>
                            text-2xl
                          </span>
                          <p>The quick brown fox ...</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}

const themeList = [
  'default',
  'plain',
  'winter',
  'snowy-night',
  'vintage',
  'vampire',
  'bubblegum',
  'green-tea',
  'wood',
  'beach',
  'halloween',
  'botanical',
  'eye-pain',
] as const;

const fontFamilyList = ['inter', 'poppins', 'chakra-petch'] as const;
