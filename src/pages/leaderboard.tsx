// !STARTERCONF You can delete this page
import clsx from 'clsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from 'next/link';
import * as React from 'react';

import useLeaderboard, { LeaderboardPayload } from '@/hooks/useLeaderboard';
import useProfile from '@/hooks/useProfile';

import AnimateFade from '@/components/Layout/AnimateFade';
import TableRow from '@/components/Leaderboard/TableRow';
import TableSkeleton from '@/components/Leaderboard/TableSkeleton';
import ArrowLink from '@/components/Link/ArrowLink';
import Seo from '@/components/Seo';

// English.
TimeAgo.addLocale(en);

export default function LeaderboardPage() {
  // todo: Get all leaderboards
  // todo: Get daily leaderboards

  const { user } = useProfile();
  const { daily, allTime, isLoading } = useLeaderboard();

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');

  const [selected, setSelected] = React.useState('daily');

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
              {!user && (
                <Link href='/account'>
                  <a>
                    <div className='hover:text-bg-90 rounded-sm bg-fg px-2 py-1 font-primary text-xs leading-5 text-bg transition-colors duration-200 hover:bg-fg/90'>
                      tip: sign in to save your stats
                    </div>
                  </a>
                </Link>
              )}
            </div>
            <h1 className='my-4 text-hl'>top 100 leaderboard</h1>
            <div className='mb-4 flex space-x-2 font-primary'>
              <button
                onClick={() => setSelected('daily')}
                className={clsx(
                  'rounded-lg px-2 py-1 transition-colors duration-200',
                  [selected === 'daily' ? 'bg-fg text-bg' : 'text-hl']
                )}
              >
                daily
              </button>
              <button
                onClick={() => setSelected('all time')}
                className={clsx(
                  'rounded-lg px-2 py-1 transition-colors duration-200',
                  [selected === 'all time' ? 'bg-fg text-bg' : 'text-hl']
                )}
              >
                all time
              </button>
            </div>

            <div className='relative overflow-auto rounded-lg bg-hl/50 p-2'>
              <table className='w-full overflow-hidden rounded-lg bg-hl/80 font-primary'>
                <thead>
                  <tr className='text-bg'>
                    <td className='py-3 pl-4 pr-4 md:pr-0'>#</td>
                    <td className='px-2 md:px-0'>user</td>
                    <td className='px-2 md:px-0'>wpm</td>
                    <td className='hidden px-2 sm:table-cell md:px-0'>type</td>
                    <td className='hidden px-2 sm:table-cell md:px-0'>time</td>
                    <td className='px-2 md:px-0'>date</td>
                  </tr>
                </thead>

                {isLoading && selected === 'all time' && <TableSkeleton />}
                {isLoading && selected === 'daily' && <TableSkeleton />}
                <tbody>
                  {selected === 'all time' &&
                    allTime?.map(
                      (leaderboard: LeaderboardPayload, index: number) => {
                        const { wpm, time, type, createdAt, name, id } =
                          leaderboard;
                        const date = timeAgo.format(
                          new Date(createdAt as string)
                        );
                        return (
                          <TableRow
                            key={id}
                            date={date}
                            index={index}
                            time={time}
                            wpm={wpm}
                            type={type}
                            username={name}
                          />
                        );
                      }
                    )}
                  {selected === 'daily' &&
                    daily?.map(
                      (leaderboard: LeaderboardPayload, index: number) => {
                        const { id, wpm, time, type, createdAt, name } =
                          leaderboard;
                        const date = timeAgo.format(
                          new Date(createdAt as string)
                        );
                        return (
                          <TableRow
                            key={id}
                            date={date}
                            index={index}
                            time={time}
                            wpm={wpm}
                            type={type}
                            username={name}
                          />
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
