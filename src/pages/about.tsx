// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';

import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function AboutPage() {
  return (
    <AnimateFade>
      <Seo title='About' />

      <main>
        <section>
          <div className={clsx('layout min-h-screen py-10')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
              back to home
            </ArrowLink>
            <h1>about</h1>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
