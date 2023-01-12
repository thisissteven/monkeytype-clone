import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  FaCrown,
  FaInfo,
  FaKeyboard,
  FaRegUser,
  FaTerminal,
  FaUser,
} from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { TbKeyboard } from 'react-icons/tb';

import useProfile from '@/hooks/useProfile';

import Tooltip from '@/components/Tooltip';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

const typeList = ['words', 'sentences', 'numbers'];

const timeList = ['15', '30', '45', '60', '120'];

export default function Header() {
  const {
    preferences: { type, time },
    dispatch,
  } = usePreferenceContext();

  const { user } = useProfile();

  const { pathname } = useRouter();

  return (
    <header className={clsx('layout bg-transparent font-primary')}>
      <div className='flex w-full flex-col items-center justify-between space-y-2 pt-12 sm:flex-row sm:space-y-0 sm:space-x-6'>
        <div className='group flex w-full items-center justify-start space-x-6 sm:w-auto'>
          <Link href='/'>
            <a>
              <div className='flex space-x-1'>
                <TbKeyboard
                  className={clsx(
                    'transition-colors duration-200 group-hover:text-hl',
                    [pathname === '/' ? 'text-hl' : 'text-hl/60'],
                    'text-4xl'
                  )}
                />

                <div className='relative text-3xl font-bold text-fg'>
                  <div
                    className={clsx(
                      'absolute -top-3 left-0 text-[8px] transition-colors duration-200 group-hover:text-fg',
                      [pathname === '/' ? 'text-fg' : 'text-fg/60']
                    )}
                  >
                    just a clone of
                  </div>
                  <span
                    className={clsx(
                      'transition-colors duration-200 group-hover:text-hl',
                      [pathname === '/' ? 'text-hl' : 'text-hl/60']
                    )}
                  >
                    monkeytype
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </div>

        <nav className='flex w-full flex-1 items-center justify-between sm:w-auto'>
          <div className='flex space-x-6'>
            <div className='relative'>
              <div className='peer'>
                <Link href='/solo'>
                  <a>
                    <FaKeyboard
                      className={clsx(
                        'cursor-pointer fill-hl/50 text-lg transition-colors duration-200 hover:fill-hl',
                        { 'fill-hl': pathname === '/solo' }
                      )}
                    />
                  </a>
                </Link>
              </div>
              <Tooltip className='cursor-default peer-hover:translate-y-0 peer-hover:opacity-100'>
                solo
              </Tooltip>
            </div>
            <div className='relative'>
              <div className='peer'>
                <Link href='/leaderboard'>
                  <a>
                    <FaCrown
                      className={clsx(
                        'cursor-pointer fill-hl/50 text-lg transition-colors duration-200 hover:fill-hl',
                        { 'fill-hl': pathname === '/leaderboard' }
                      )}
                    />
                  </a>
                </Link>
              </div>
              <Tooltip className='cursor-default peer-hover:translate-y-0 peer-hover:opacity-100'>
                leaderboard
              </Tooltip>
            </div>
            <div className='relative'>
              <div className='peer'>
                <Link href='/about'>
                  <a>
                    <FaInfo
                      className={clsx(
                        'cursor-pointer fill-hl/50 text-lg transition-colors duration-200 hover:fill-hl',
                        { 'fill-hl': pathname === '/about' }
                      )}
                    />
                  </a>
                </Link>
              </div>
              <Tooltip className='cursor-default peer-hover:translate-y-0 peer-hover:opacity-100'>
                about
              </Tooltip>
            </div>
            <div className='relative'>
              <div className='peer'>
                <Link href='/multiplayer'>
                  <a>
                    <RiTeamFill
                      className={clsx(
                        'cursor-pointer fill-hl/50 text-lg transition-colors duration-200 hover:fill-hl',
                        { 'fill-hl': pathname === '/multiplayer' }
                      )}
                    />
                  </a>
                </Link>
              </div>
              <Tooltip className='cursor-default peer-hover:translate-y-0 peer-hover:opacity-100'>
                multiplayer
              </Tooltip>
            </div>
            <div className='relative'>
              <div className='peer'>
                <Link href='/account'>
                  <a>
                    <div className='group flex h-full cursor-pointer gap-2 transition-colors duration-200 '>
                      {user ? (
                        <FaUser
                          className={clsx(
                            'fill-hl/50 text-lg group-hover:fill-hl',
                            { 'fill-hl': pathname === '/account' }
                          )}
                        />
                      ) : (
                        <FaRegUser
                          className={clsx(
                            'fill-hl/50 text-lg group-hover:fill-hl',
                            { 'fill-hl': pathname === '/account' }
                          )}
                        />
                      )}
                      <span
                        className={clsx(
                          'relative bottom-[2px] hidden group-hover:text-hl xs:block',
                          { 'text-hl': pathname === '/account' },
                          { 'text-hl/70': pathname !== '/account' }
                        )}
                      >
                        {user?.name}
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
              <Tooltip className='cursor-default peer-hover:translate-y-0 peer-hover:opacity-100'>
                account
              </Tooltip>
            </div>
          </div>
          <div className='hidden flex-col -space-y-1 sm:space-y-1 ns:flex'>
            <div className='flex cursor-pointer list-none space-x-1.5 text-[10px] font-semibold sm:text-xs'>
              {typeList.map((item) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TYPE', payload: item })}
                  key={item}
                  className={`${
                    item === type ? 'text-hl' : 'text-hl/50'
                  } transition-colors duration-200 hover:text-hl`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className='flex cursor-pointer list-none justify-end space-x-2 text-[10px] font-semibold sm:text-xs'>
              {timeList.map((item) => (
                <div
                  onClick={() => dispatch({ type: 'SET_TIME', payload: item })}
                  key={item}
                  className={`${
                    item === time ? 'text-hl' : 'text-hl/50'
                  } transition-colors duration-200 hover:text-hl`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            className='rounded-full bg-hl p-2 ns:hidden'
            onClick={() => dispatch({ type: 'TOGGLE_COMMAND_PALETTE' })}
          >
            <FaTerminal className='cursor-pointer fill-bg/90 text-lg' />
          </div>
        </nav>
      </div>
    </header>
  );
}
