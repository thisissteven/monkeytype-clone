// !STARTERCONF You can delete this page
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';

// English.
TimeAgo.addDefaultLocale(en);

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
  const { ref, inView } = useInView();
  const { data, refetch, fetchMore } = useQuery(GetLeaderboards, {
    variables: { page: 1, pageSize: 50 },
  });

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  const [page, setPage] = React.useState(() => 1);
  const [pageCount, setPageCount] = React.useState(() => 0);

  React.useEffect(() => {
    if (page === 1) return;
    if (page > pageCount) return;
    fetchMore({
      variables: { page: page, pageSize: 50 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const currentLeaderboards: { leaderboards: { data: Leaderboard[] } } = {
          leaderboards: {
            ...prev.leaderboards,
            data: [
              ...prev.leaderboards.data,
              ...fetchMoreResult.leaderboards.data,
            ],
          },
        };

        return currentLeaderboards;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    if (data) {
      const {
        leaderboards: {
          meta: {
            pagination: { pageCount },
          },
        },
      } = data;
      setPageCount(pageCount);
    }
  }, [data]);

  React.useEffect(() => {
    if (page === pageCount) return;
    if (inView) {
      setPage((page) => {
        if (page >= pageCount) return page;
        return page + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <AnimateFade>
      <Seo title='Leaderboard' />

      <main>
        <section>
          <div className={clsx('layout min-h-screen py-10')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
              back to home
            </ArrowLink>
            <div className='mb-4 flex items-center justify-between'>
              <h1>leaderboard</h1>
              <button
                onClick={() => refetch()}
                className='group relative mt-2 flex items-center rounded-lg border-0 px-4 py-2 text-fg/50 outline-none transition-colors duration-200 hover:text-fg'
              >
                <VscDebugRestart className='scale-x-[-1] transform text-2xl' />
                <Tooltip
                  className='top-12 bg-fg group-hover:translate-y-0 group-hover:opacity-100'
                  triangle='bg-fg'
                >
                  Refresh data
                </Tooltip>
              </button>
            </div>

            <div className='overflow-auto rounded-lg bg-hl/50 p-2'>
              <table className='w-full overflow-hidden rounded-lg font-primary'>
                <thead>
                  <tr className='bg-hl text-bg'>
                    <td className='py-3 pl-4 pr-4 md:pr-0'>#</td>
                    <td className='px-2 md:px-0'>user</td>
                    <td className='px-2 md:px-0'>wpm</td>
                    <td className='px-2 md:px-0'>type</td>
                    <td className='px-2 md:px-0'>time</td>
                    <td className='px-2 md:px-0'>date</td>
                  </tr>
                </thead>

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
                          <td className='px-2 text-sm text-bg md:px-0'>
                            {type}
                          </td>
                          <td className='px-2 text-sm text-bg md:px-0'>
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

            <div ref={ref}></div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
