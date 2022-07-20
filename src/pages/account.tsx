/* eslint-disable @typescript-eslint/no-explicit-any */
// !STARTERCONF You can delete this page
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as React from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import Login from '@/components/accounts/Login';
import Register from '@/components/accounts/Register';
import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { useAuthState } from '@/context/User/UserContext';

// English.
TimeAgo.addLocale(en);

const GetProfile = gql`
  query GetMyProfile($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        attributes {
          username
          createdAt
        }
      }
    }
  }
`;

const GetRecents = gql`
  query GetRecents($id: ID!) {
    leaderboards(
      sort: "createdAt:desc"
      pagination: { page: 0, pageSize: 4 }
      filters: { user: { id: { eq: $id } } }
    ) {
      data {
        id
        attributes {
          wpm
          type
          time
          createdAt
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

const GetPersonalBest = gql`
  query GetPersonalBest($id: ID!) {
    leaderboards(
      sort: "wpm:desc"
      pagination: { page: 0, pageSize: 4 }
      filters: { user: { id: { eq: $id } } }
    ) {
      data {
        id
        attributes {
          wpm
          type
          time
          createdAt
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export default function AccountPage() {
  const {
    state: { authenticated, user },
    logout,
  } = useAuthState();

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  const { data } = useQuery(GetProfile, { variables: { id: user?.id } });
  const { data: personalBest } = useQuery(GetPersonalBest, {
    variables: { id: user?.id },
    pollInterval: 500,
  });
  const { data: recents } = useQuery(GetRecents, {
    variables: { id: user?.id },
    pollInterval: 500,
  });

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
              {authenticated && user ? (
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
                      <span className='text-lg text-hl'>
                        {data?.usersPermissionsUser?.data?.attributes?.username}
                      </span>
                      <span className='text-sm text-hl'>
                        Joined{' '}
                        {timeAgo &&
                          data &&
                          timeAgo?.format(
                            new Date(
                              data?.usersPermissionsUser?.data?.attributes?.createdAt
                            )
                          )}
                      </span>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-col gap-4 rounded-lg bg-font/10 p-4'>
                    <p className='min-w-1/2 flex-1 whitespace-nowrap text-lg text-hl'>
                      Personal Best
                    </p>
                    <div className='flex flex-wrap gap-8'>
                      {personalBest?.leaderboards?.data.map((best: any) => (
                        <div
                          key={best.id}
                          className='flex max-w-[240px] flex-1 flex-col items-start'
                        >
                          <span className='flex items-center gap-2 whitespace-nowrap text-hl'>
                            <span className='rounded-sm bg-fg px-2 py-1 text-sm text-bg'>
                              {best.attributes.wpm} wpm
                            </span>
                            <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                              {best.attributes.type}
                            </span>
                            <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                              {best.attributes.time}s
                            </span>
                          </span>
                          <span className='mt-2 text-xs'>
                            {timeAgo &&
                              data &&
                              timeAgo?.format(
                                new Date(best.attributes.createdAt)
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
                      {recents?.leaderboards?.data.map((recent: any) => (
                        <div
                          key={recent.id}
                          className='flex max-w-[240px] flex-1 flex-col items-start'
                        >
                          <span className='flex items-center gap-2 whitespace-nowrap text-hl'>
                            <span className='rounded-sm bg-fg px-2 py-1 text-sm text-bg'>
                              {recent.attributes.wpm} wpm
                            </span>
                            <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                              {recent.attributes.type}
                            </span>
                            <span className='rounded-sm bg-hl px-2 py-1 text-sm text-bg'>
                              {recent.attributes.time}s
                            </span>
                          </span>
                          <span className='mt-2 text-xs'>
                            {timeAgo &&
                              data &&
                              timeAgo?.format(
                                new Date(recent.attributes.createdAt)
                              )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='h-4'></div>
                  {authenticated && user && (
                    <button
                      onClick={logout}
                      className='mt-4 flex items-center justify-center rounded-md bg-hl px-3 py-1.5 text-sm text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-80'
                    >
                      <FaSignOutAlt className='mr-2' />
                      Sign out
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key='not-authenticated'
                  className='flex flex-col justify-center gap-8 sm:flex-row sm:items-center sm:gap-16'
                >
                  <div className='flex w-full max-w-[280px] flex-col'>
                    <Register />
                  </div>
                  <div className='flex w-full max-w-[280px] flex-col'>
                    <Login />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
