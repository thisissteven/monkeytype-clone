import clsx from 'clsx';
import Image from 'next/image';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Seo from '@/components/Seo';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';
import { useAuthState } from '@/context/User/UserContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  const {
    preferences: { theme, fontFamily },
  } = usePreferenceContext();

  const {
    state: { loading },
  } = useAuthState();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      {isLoading || loading ? (
        <>
          <Seo title='Monkeytype Clone' />
          <div
            className={clsx(
              theme,
              fontFamily,
              'fixed inset-0 flex h-screen w-screen items-center justify-center bg-bg'
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
            <NextNProgress
              color={`rgb(${progressColors[theme as ProgressColorType]})`}
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              showOnShallow={true}
            />
            {children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

const progressColors = {
  default: '63 78 79',
  space: '240 165 0',
  winter: '239 255 253',
  'snowy-night': '231 246 242',
  vintage: '247 236 222',
  vampire: '218 0 55',
  taro: '183 211 223',
  'green-tea': '166 207 152',
  wood: '208 201 192',
  beach: '58 180 242',
  halloween: '238 238 238',
  spring: '255 220 174',
  'eye-pain': '255 0 231',
};

type ProgressColorType = keyof typeof progressColors;
