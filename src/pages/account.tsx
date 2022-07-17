// !STARTERCONF You can delete this page
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import Login from '@/components/accounts/Login';
import Register from '@/components/accounts/Register';
import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { useAuthState } from '@/context/User/UserContext';

export default function AccountPage() {
  const {
    state: { authenticated, user },
  } = useAuthState();

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

            <AnimatePresence exitBeforeEnter>
              {authenticated && user ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key='authenticated'
                >
                  {user?.email}
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
