// !STARTERCONF You can delete this page
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from 'next/link';
import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';
import { VscDebugRestart } from 'react-icons/vsc';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import Tooltip from '@/components/Tooltip';

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
  query GetLeaderboards(
    $page: Int!
    $pageSize: Int!
    $type: String
    $time: Int
  ) {
    leaderboards(
      sort: "wpm:desc"
      pagination: { page: $page, pageSize: $pageSize }
      filters: { type: { eq: $type }, and: { time: { eq: $time } } }
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

const filterByType = ['words', 'sentences', 'numbers'];
const filterByTime = [15, 30, 45, 60, 120];

export default function LeaderboardPage() {
  const { ref, inView } = useInView();
  const { data, refetch, fetchMore } = useQuery(GetLeaderboards, {
    variables: { page: 1, pageSize: 100 },
    pollInterval: 500,
  });

  const {
    state: { user, authenticated },
  } = useAuthState();

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(() => 0);

  const [type, setType] = React.useState('');
  const [time, setTime] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredData = React.useMemo(
    () =>
      data?.leaderboards?.data.filter((item: Leaderboard) => {
        if (time && !type) {
          return item.attributes.time === time;
        } else if (type && !time) {
          return item.attributes.type === type;
        } else if (time && type) {
          return item.attributes.time === time && item.attributes.type === type;
        } else {
          return data?.leaderboards?.data;
        }
      }),
    [time, type, data]
  );

  React.useEffect(() => {
    if (page > pageCount) return;
    fetchMore({
      variables: { page: page, pageSize: 100 },
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
    }).then(() => setPage((page) => page + 1));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (page >= pageCount) return;
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
          <div className={clsx('layout min-h-[65vh] pt-10')}>
            <div className='flex flex-wrap items-center justify-between gap-2 xs:whitespace-nowrap'>
              <ArrowLink direction='left' className='my-4 text-hl' href='/'>
                back to home
              </ArrowLink>
              {!user && !authenticated && (
                <Link href='/account'>
                  <a>
                    <span className='hover:text-bg-90 mb-2 rounded-sm bg-fg px-2 py-1 text-xs text-bg transition-colors duration-200 hover:bg-fg/90'>
                      tip: sign in to see your name in leaderboard
                    </span>
                  </a>
                </Link>
              )}
            </div>
            <div className='mb-2 flex items-center justify-between'>
              <h1 className='text-hl'>leaderboard</h1>
              <button
                onClick={() =>
                  refetch().then(() => {
                    setPage(1);
                    setType('');
                    setTime(0);
                  })
                }
                className='relative mt-2 flex items-center rounded-lg border-0 px-4 py-2 outline-none '
              >
                <VscDebugRestart className='peer scale-x-[-1] transform text-2xl text-fg/50  transition-colors duration-200 hover:text-fg' />
                <Tooltip
                  className='top-12 bg-fg font-primary peer-hover:translate-y-0 peer-hover:opacity-100'
                  triangle='bg-fg'
                >
                  Refresh data
                </Tooltip>
              </button>
            </div>

            <div className='my-4 flex flex-wrap items-center justify-end gap-4 font-primary sm:justify-between'>
              <div className='hidden sm:block'>
                <p>filter by:</p>
              </div>
              <div className='flex flex-wrap justify-end gap-2'>
                <div className='flex gap-2'>
                  <button
                    className={clsxm(
                      [!type && !time ? 'text-fg' : 'text-fg/50'],
                      'transition-colors duration-200 hover:text-fg'
                    )}
                    onClick={() => {
                      setType('');
                      setTime(0);
                    }}
                  >
                    all
                  </button>
                  {filterByType.map((item) => {
                    return (
                      <button
                        key={item}
                        className={clsxm(
                          [type === item ? 'text-fg' : 'text-fg/50'],
                          'transition-colors duration-200 hover:text-fg'
                        )}
                        onClick={() => setType(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className='flex gap-2'>
                  {filterByTime.map((item) => {
                    return (
                      <button
                        key={item}
                        className={clsxm(
                          [time === item ? 'text-fg' : 'text-fg/50'],
                          'transition-colors duration-200 hover:text-fg'
                        )}
                        onClick={() => setTime(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='relative overflow-auto rounded-lg bg-hl/50 p-2'>
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

                <AnimatePresence exitBeforeEnter>
                  <motion.tbody
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    key={time + type}
                  >
                    {filteredData?.map(
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
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>

            <div ref={ref}></div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
