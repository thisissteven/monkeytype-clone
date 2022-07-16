// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function LeaderboardPage() {
  return (
    <AnimateFade>
      <Seo title='Leaderboard' />

      <main>
        <section>
          <div className={clsx('layout min-h-screen py-10')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
              Back to Home
            </ArrowLink>
            <h1>Leaderboard</h1>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
