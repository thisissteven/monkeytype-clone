/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as React from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import useAuth from '@/hooks/useAuth';
import { LeaderboardPayload } from '@/hooks/useLeaderboard';
import useProfile from '@/hooks/useProfile';

import Login from '@/components/Account/Login';
import Button from '@/components/Button/Button';
import AnimateFade from '@/components/Layout/AnimateFade';
import ArrowLink from '@/components/Link/ArrowLink';
import Seo from '@/components/Seo';

// English.
TimeAgo.addLocale(en);

export default function AccountPage() {
  const { logout, isValidating } = useAuth();
  const { user, profileStats } = useProfile();

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  return (
    <AnimateFade>
      <Seo title='Account' />

      <main>
        <section>
          <div className={clsx('layout min-h-[65vh] pt-10 font-primary')}>
            <ArrowLink direction='left' className='my-4 text-hl' href='/'>
              back to home
            </ArrowLink>
            <h1 className='mb-4'>account</h1>

            <AnimatePresence exitBeforeEnter>
              {user ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key='authenticated'
                  className='text-hl'
                >
                  <div className='flex items-center gap-4 rounded-lg bg-font/10 p-4'>
                    <div>
                      <FaUserCircle className='text-6xl' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-lg text-hl'>{user.name}</span>
                      <span className='text-sm text-hl'>
                        Joined{' '}
                        {timeAgo && timeAgo?.format(new Date(user.createdAt))}
                      </span>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-col gap-4 rounded-lg bg-font/10 p-4'>
                    <p className='min-w-1/2 flex-1 whitespace-nowrap text-lg text-hl'>
                      Personal Best
                    </p>
                    <div className='flex flex-wrap gap-8'>
                      {profileStats?.best.length === 0
                        ? '-'
                        : profileStats?.best.map((best: LeaderboardPayload) => (
                            <div
                              key={best.id}
                              className='flex max-w-[240px] flex-1 flex-col items-start'
                            >
                              <span className='flex items-center gap-2 whitespace-nowrap text-hl'>
                                <span className='rounded-sm bg-fg px-2 py-1 text-sm text-bg'>
                                  {best.wpm} wpm
                                </span>
                                <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                                  {best.type}
                                </span>
                                <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                                  {best.time}s
                                </span>
                              </span>
                              <span className='mt-2 text-xs'>
                                {timeAgo &&
                                  timeAgo?.format(
                                    new Date(best.createdAt as string)
                                  )}
                              </span>
                            </div>
                          ))}
                    </div>
                  </div>
                  <div className='mt-4 flex flex-col gap-4 rounded-lg bg-font/10 p-4'>
                    <p className='min-w-1/2 flex-1 whitespace-nowrap text-lg text-hl'>
                      Recent tests
                    </p>
                    <div className='flex flex-wrap gap-8'>
                      {profileStats?.recent.length === 0
                        ? '-'
                        : profileStats?.recent.map((recent: any) => (
                            <div
                              key={recent.id}
                              className='flex max-w-[240px] flex-1 flex-col items-start'
                            >
                              <span className='flex items-center gap-2 whitespace-nowrap text-hl'>
                                <span className='rounded-sm bg-fg px-2 py-1 text-sm text-bg'>
                                  {recent.wpm} wpm
                                </span>
                                <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                                  {recent.type}
                                </span>
                                <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                                  {recent.time}s
                                </span>
                              </span>
                              <span className='mt-2 text-xs'>
                                {timeAgo &&
                                  timeAgo?.format(
                                    new Date(recent.createdAt as string)
                                  )}
                              </span>
                            </div>
                          ))}
                    </div>
                  </div>
                  <div className='h-4'></div>
                  {user && (
                    <Button
                      disabled={isValidating}
                      onClick={logout}
                      className='mt-4 flex items-center justify-center rounded-md bg-fg px-3 py-1.5 text-sm text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-80'
                    >
                      <FaSignOutAlt className='mr-2' />
                      Sign out
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key='not-authenticated'
                >
                  <Login />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
