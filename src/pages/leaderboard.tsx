// !STARTERCONF You can delete this page
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { GiPodiumSecond, GiPodiumThird } from 'react-icons/gi';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

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
  const { data, fetchMore } = useQuery(GetLeaderboards, {
    variables: { page: 1, pageSize: 50 },
  });

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
        const currentLeaderboards = {
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
            <h1 className='mb-4'>leaderboard</h1>

            <div className='flex flex-col gap-2'>
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
                    <div
                      key={index}
                      className={clsxm('h-10 rounded-md', [
                        index % 2 === 0 ? 'bg-fg' : 'bg-fg/60',
                      ])}
                    >
                      <div className='flex h-full items-center justify-between px-4'>
                        {/* first rank */}
                        {index === 0 ? (
                          <span className='flex items-center gap-2 text-bg'>
                            <FaCrown />
                            <div className='ml-4 flex items-center gap-2'>
                              <FaUserCircle /> {username}
                            </div>
                          </span>
                        ) : // second rank
                        index === 1 ? (
                          <span className='flex items-center gap-2 text-bg'>
                            <GiPodiumSecond />
                            <div className='ml-4 flex items-center gap-2'>
                              <FaUserCircle /> {username}
                            </div>
                          </span>
                        ) : // third rank
                        index === 2 ? (
                          <span className='flex items-center gap-2 text-bg'>
                            <GiPodiumThird />
                            <div className='ml-4 flex items-center gap-2'>
                              <FaUserCircle /> {username}
                            </div>
                          </span>
                        ) : (
                          // any rank lower than third
                          <span className='flex items-center gap-2 text-bg'>
                            <span className='text-bg'>{index}</span>
                            <div className='ml-4 flex items-center gap-2'>
                              <FaUserCircle /> {username}
                            </div>
                          </span>
                        )}

                        <div className='flex items-center gap-3'>
                          <p
                            className={clsxm(
                              'rounded-md bg-bg px-2 py-1 text-xs text-fg'
                            )}
                          >
                            {wpm}wpm
                          </p>
                          <p
                            className={clsxm('rounded-md px-2 py-1 text-xs', [
                              index % 2 === 0
                                ? 'bg-bg/70 text-fg'
                                : 'bg-fg/70 text-bg',
                            ])}
                          >
                            {type}
                          </p>
                          <p
                            className={clsxm('rounded-md px-2 py-1 text-xs', [
                              index % 2 === 0
                                ? 'bg-bg/70 text-fg'
                                : 'bg-fg/70 text-bg',
                            ])}
                          >
                            {time}
                          </p>
                          <p
                            className={clsxm('rounded-md px-2 py-1 text-xs', [
                              index % 2 === 0
                                ? 'bg-bg/70 text-fg'
                                : 'bg-fg/70 text-bg',
                            ])}
                          >
                            {new Date(createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div ref={ref}></div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
