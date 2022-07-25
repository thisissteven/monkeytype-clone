// !STARTERCONF You can delete this page
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from 'next/link';
import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

import AnimateFade from '@/components/Layout/AnimateFade';
import TableSkeleton from '@/components/Leaderboard/TableSkeleton';
import ArrowLink from '@/components/Link/ArrowLink';
import Seo from '@/components/Seo';

import { useAuthState } from '@/context/User/UserContext';

// English.
TimeAgo.addLocale(en);

type Leaderboard = {
  id: string;
  attributes: {
    wpm: number;
    type: 'words' | 'sentences' | 'numbers';
    time: 15 | 30 | 45 | 60 | 120;
    createdAt: string;
    user: {
      data: {
        attributes: {
          username: string;
        };
      };
    };
  };
};

const GetLeaderboards = gql`
  query GetLeaderboards($page: Int!, $pageSize: Int!) {
    leaderboards(
      sort: "wpm:desc"
      pagination: { page: $page, pageSize: $pageSize }
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
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;

export default function LeaderboardPage() {
  const { data, loading } = useQuery(GetLeaderboards, {
    variables: { page: 1, pageSize: 100 },
    pollInterval: 500,
  });

  const {
    state: { user, authenticated },
  } = useAuthState();

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  return (
    <AnimateFade>
      <Seo title='Leaderboard' />

      <main>
        <section>
          <div className={clsx('layout min-h-[65vh] pt-10')}>
            <div className='flex flex-wrap items-center justify-between gap-2 xs:whitespace-nowrap'>
              <ArrowLink direction='left' className='my-4 text-hl' href='/'>
                back to home
              </ArrowLink>
              {!user && !authenticated && (
                <Link href='/account'>
                  <a>
                    <div className='hover:text-bg-90 rounded-sm bg-fg px-2 py-1 font-primary text-xs leading-5 text-bg transition-colors duration-200 hover:bg-fg/90'>
                      tip: sign in to see your name in leaderboard
                    </div>
                  </a>
                </Link>
              )}
            </div>
            <h1 className='my-4 text-hl'>top 100 leaderboard</h1>

            <div className='relative overflow-auto rounded-lg bg-hl/50 p-2'>
              <table className='w-full overflow-hidden rounded-lg font-primary'>
                <thead>
                  <tr className='bg-hl text-bg'>
                    <td className='py-3 pl-4 pr-4 md:pr-0'>#</td>
                    <td className='px-2 md:px-0'>user</td>
                    <td className='px-2 md:px-0'>wpm</td>
                    <td className='hidden px-2 sm:table-cell md:px-0'>type</td>
                    <td className='hidden px-2 sm:table-cell md:px-0'>time</td>
                    <td className='px-2 md:px-0'>date</td>
                  </tr>
                </thead>

                {loading && <TableSkeleton />}
                <tbody>
                  {data?.leaderboards?.data?.map(
                    (leaderboard: Leaderboard, index: number) => {
                      const {
                        attributes: {
                          wpm,
                          time,
                          type,
                          createdAt,
                          user: {
                            data: {
                              attributes: { username },
                            },
                          },
                        },
                      } = leaderboard;
                      return (
                        <tr
                          key={index}
                          className={clsxm(
                            'whitespace-nowrap border-t-4 border-hl',
                            [index % 2 === 0 ? 'bg-fg' : 'bg-fg/80']
                          )}
                        >
                          <td className='py-3 pl-4'>
                            <span className='text-bg'>
                              {/* first rank */}
                              {index === 0 ? (
                                <FaCrown className='my-1' />
                              ) : (
                                index + 1
                              )}
                            </span>
                          </td>

                          <td className='px-2 md:px-0'>
                            <div className='flex items-center gap-2 text-bg'>
                              <FaUserCircle /> {username}
                            </div>
                          </td>

                          <td className='px-2 text-bg md:px-0'>
                            <span
                              className={clsxm(
                                'rounded-md bg-bg px-2 py-1 text-xs text-fg'
                              )}
                            >
                              {wpm} wpm
                            </span>
                          </td>

                          <td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0'>
                            {type}
                          </td>
                          <td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0'>
                            {time}s
                          </td>
                          <td className='px-2 text-sm text-bg md:px-0'>
                            {timeAgo.format(new Date(createdAt))}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
