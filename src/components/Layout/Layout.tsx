import clsx from 'clsx';
import Image from 'next/image';
import NextNProgress from 'nextjs-progressbar';
import * as React from 'react';

import Footer from '@/components/Layout/Footer';
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
                  src='/images/monkeytype-clone.gif'
                  width={180}
                  height={180}
                  alt='Monkeytype Clone - Typeracer App based on Monkeytype'
                  className='scale-50'
                />
                <p className='hidden'>
                  Monkeytype Clone - Typeracer App based on Monkeytype
                </p>
                <div className='loading -mt-12 font-primary text-hl'>
                  Preparing the page for you...
                </div>
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
          <div className='layout flex h-full flex-col bg-transparent'>
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
  default: '58 163 193',
  plain: '75 75 75',
  winter: '239 255 253',
  'snowy-night': '231 246 242',
  vintage: '247 236 222',
  vampire: '179 48 48',
  bubblegum: '193 255 207',
  'green-tea': '227 243 172',
  wood: '160 147 125',
  beach: '242 223 58',
  halloween: '245 136 64',
  botanical: '242 240 233',
  'eye-pain': '255 0 231',
};

type ProgressColorType = keyof typeof progressColors;
