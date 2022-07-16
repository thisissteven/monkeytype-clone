// !STARTERCONF You can delete this page
import clsx from 'clsx';
import * as React from 'react';

import Login from '@/components/accounts/Login';
import Register from '@/components/accounts/Register';
import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function AccountPage() {
  return (
    <AnimateFade>
      <Seo title='Account' />

      <main>
        <section>
          <div className={clsx('layout min-h-[60vh] py-10 font-primary')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
              Back to Home
            </ArrowLink>
            <h1 className='mb-4'>Account</h1>

            <div className='flex flex-col justify-center gap-8 sm:flex-row sm:items-center sm:gap-16'>
              <div className='flex w-full max-w-[280px] flex-col'>
                <Register />
              </div>
              <div className='flex w-full max-w-[280px] flex-col'>
                <Login />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
