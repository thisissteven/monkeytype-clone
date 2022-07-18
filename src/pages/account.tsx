// !STARTERCONF You can delete this page
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import Login from '@/components/accounts/Login';
import Register from '@/components/accounts/Register';
import AnimateFade from '@/components/layout/AnimateFade';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import { useAuthState } from '@/context/User/UserContext';

export default function AccountPage() {
  const {
    state: { authenticated, user },
    logout,
  } = useAuthState();

  return (
    <AnimateFade>
      <Seo title='Account' />

      <main>
        <section>
          <div className={clsx('layout min-h-[65vh] py-10 font-primary')}>
            <ArrowLink direction='left' className='my-4 text-font' href='/'>
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
                  {user?.username}
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

            {authenticated && user && (
              <button
                onClick={logout}
                className='mt-4 flex items-center justify-center rounded-md bg-font px-3 py-1.5 text-sm text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-70'
              >
                <FaSignOutAlt className='mr-2' />
                Sign out
              </button>
            )}
          </div>
        </section>
      </main>
    </AnimateFade>
  );
}
