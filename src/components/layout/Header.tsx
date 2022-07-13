import clsx from 'clsx';
import * as React from 'react';
import { FaCog, FaCrown, FaInfo, FaKeyboard } from 'react-icons/fa';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  return (
    <header className={clsx('bg-transparent')}>
      <div className='layout flex h-14 items-center justify-between space-x-6 pt-12'>
        <div className='flex items-center space-x-6'>
          <div className='flex space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='-680 -1030 300 180'
              width={32}
              height={44}
              className='fill-hl'
            >
              <g>
                <path d='M -430 -910 L -430 -910 C -424.481 -910 -420 -905.519 -420 -900 L -420 -900 C -420 -894.481 -424.481 -890 -430 -890 L -430 -890 C -435.519 -890 -440 -894.481 -440 -900 L -440 -900 C -440 -905.519 -435.519 -910 -430 -910 Z'></path>
                <path d=' M -570 -910 L -510 -910 C -504.481 -910 -500 -905.519 -500 -900 L -500 -900 C -500 -894.481 -504.481 -890 -510 -890 L -570 -890 C -575.519 -890 -580 -894.481 -580 -900 L -580 -900 C -580 -905.519 -575.519 -910 -570 -910 Z '></path>
                <path d='M -590 -970 L -590 -970 C -584.481 -970 -580 -965.519 -580 -960 L -580 -940 C -580 -934.481 -584.481 -930 -590 -930 L -590 -930 C -595.519 -930 -600 -934.481 -600 -940 L -600 -960 C -600 -965.519 -595.519 -970 -590 -970 Z'></path>
                <path d=' M -639.991 -960.515 C -639.72 -976.836 -626.385 -990 -610 -990 L -610 -990 C -602.32 -990 -595.31 -987.108 -590 -982.355 C -584.69 -987.108 -577.68 -990 -570 -990 L -570 -990 C -553.615 -990 -540.28 -976.836 -540.009 -960.515 C -540.001 -960.345 -540 -960.172 -540 -960 L -540 -960 L -540 -940 C -540 -934.481 -544.481 -930 -550 -930 L -550 -930 C -555.519 -930 -560 -934.481 -560 -940 L -560 -960 L -560 -960 C -560 -965.519 -564.481 -970 -570 -970 C -575.519 -970 -580 -965.519 -580 -960 L -580 -960 L -580 -960 L -580 -940 C -580 -934.481 -584.481 -930 -590 -930 L -590 -930 C -595.519 -930 -600 -934.481 -600 -940 L -600 -960 L -600 -960 L -600 -960 L -600 -960 L -600 -960 L -600 -960 L -600 -960 L -600 -960 C -600 -965.519 -604.481 -970 -610 -970 C -615.519 -970 -620 -965.519 -620 -960 L -620 -960 L -620 -940 C -620 -934.481 -624.481 -930 -630 -930 L -630 -930 C -635.519 -930 -640 -934.481 -640 -940 L -640 -960 L -640 -960 C -640 -960.172 -639.996 -960.344 -639.991 -960.515 Z '></path>
                <path d=' M -460 -930 L -460 -900 C -460 -894.481 -464.481 -890 -470 -890 L -470 -890 C -475.519 -890 -480 -894.481 -480 -900 L -480 -930 L -508.82 -930 C -514.99 -930 -520 -934.481 -520 -940 L -520 -940 C -520 -945.519 -514.99 -950 -508.82 -950 L -431.18 -950 C -425.01 -950 -420 -945.519 -420 -940 L -420 -940 C -420 -934.481 -425.01 -930 -431.18 -930 L -460 -930 Z '></path>
                <path d='M -470 -990 L -430 -990 C -424.481 -990 -420 -985.519 -420 -980 L -420 -980 C -420 -974.481 -424.481 -970 -430 -970 L -470 -970 C -475.519 -970 -480 -974.481 -480 -980 L -480 -980 C -480 -985.519 -475.519 -990 -470 -990 Z'></path>
                <path d=' M -630 -910 L -610 -910 C -604.481 -910 -600 -905.519 -600 -900 L -600 -900 C -600 -894.481 -604.481 -890 -610 -890 L -630 -890 C -635.519 -890 -640 -894.481 -640 -900 L -640 -900 C -640 -905.519 -635.519 -910 -630 -910 Z '></path>
                <path d=' M -515 -990 L -510 -990 C -504.481 -990 -500 -985.519 -500 -980 L -500 -980 C -500 -974.481 -504.481 -970 -510 -970 L -515 -970 C -520.519 -970 -525 -974.481 -525 -980 L -525 -980 C -525 -985.519 -520.519 -990 -515 -990 Z '></path>
                <path d=' M -660 -910 L -680 -910 L -680 -980 C -680 -1007.596 -657.596 -1030 -630 -1030 L -430 -1030 C -402.404 -1030 -380 -1007.596 -380 -980 L -380 -900 C -380 -872.404 -402.404 -850 -430 -850 L -630 -850 C -657.596 -850 -680 -872.404 -680 -900 L -680 -920 L -660 -920 L -660 -900 C -660 -883.443 -646.557 -870 -630 -870 L -430 -870 C -413.443 -870 -400 -883.443 -400 -900 L -400 -980 C -400 -996.557 -413.443 -1010 -430 -1010 L -630 -1010 C -646.557 -1010 -660 -996.557 -660 -980 L -660 -910 Z '></path>
              </g>
            </svg>
            <UnstyledLink
              href='/'
              className='relative text-3xl font-bold text-fg'
            >
              <div className='absolute -top-2.5 left-0 text-[8px] text-fg/80'>
                just a clone of
              </div>
              monkeytype
            </UnstyledLink>
          </div>
        </div>

        <nav className='flex flex-1 items-center justify-between'>
          <div className='flex space-x-6'>
            <FaKeyboard className='cursor-pointer fill-fg/50 transition-colors duration-200 hover:fill-fg' />
            <FaCrown className='cursor-pointer fill-fg/50 transition-colors duration-200 hover:fill-fg' />
            <FaInfo className='cursor-pointer fill-fg/50 transition-colors duration-200 hover:fill-fg' />
            <FaCog className='cursor-pointer fill-fg/50 transition-colors duration-200 hover:fill-fg' />
          </div>
          <div className='flex flex-col -space-y-2'>
            <div className='flex cursor-pointer list-none space-x-1.5 text-[10px] font-semibold'>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                words
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                sentences
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                numbers
              </li>
            </div>
            <div className='flex cursor-pointer list-none justify-end space-x-2 text-[10px] font-semibold'>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                15
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                30
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                45
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                60
              </li>
              <li className='text-fg/50 transition-colors duration-200 hover:text-fg'>
                120
              </li>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
