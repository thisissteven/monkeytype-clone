import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Seo from '@/components/Seo';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const {
    preferences: { theme, fontFamily },
  } = usePreferenceContext();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Seo title='Preparing page...' />
          <div
            className={clsx(
              theme,
              fontFamily,
              'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-bg'
            )}
          >
            <div className='flex max-w-[500px] flex-wrap items-center justify-center gap-x-8'>
              <div className='flex flex-col'>
                <Image
                  src='/images/walking-mushroom.gif'
                  width={180}
                  height={180}
                  alt='walking-mushroom'
                  className='scale-50'
                />
                <p className='loading -mt-12'>Preparing the page for you...</p>
              </div>
              <div className='hidden flex-col xs:flex'>
                <Image
                  src='/images/walking-mushroom.gif'
                  width={180}
                  height={180}
                  alt='walking-mushroom'
                  className='scale-50'
                />
                <p className='loading -mt-12'>Preparing the page for you...</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={clsx(
            theme,
            fontFamily,
            'sm:scrollbar h-screen w-full overflow-y-scroll bg-bg transition-colors duration-300'
          )}
        >
          <div className='layout bg-transparent'>
            {children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
