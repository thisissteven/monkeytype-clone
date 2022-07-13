import { Combobox, Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { usePreferenceContext } from '@/context/PreferenceProvider';

export type PokemonData = {
  name: string;
  url: string;
};

const CommandPalette = ({ results }: { results: PokemonData[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();

  const {
    preferences: { theme, fontFamily },
  } = usePreferenceContext();

  const filteredResults = query
    ? results.filter((result) =>
        result.name.toLowerCase().includes(query.toLowerCase())
      )
    : results;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === 'p' || event.key === 'k') &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const completeButtonRef = React.useRef(null);
  return (
    <Transition.Root
      show={isOpen}
      as={React.Fragment}
      afterLeave={() => setQuery('')}
    >
      <Dialog
        onClose={setIsOpen}
        initialFocus={completeButtonRef}
        ref={completeButtonRef}
        className={clsx(
          'fixed inset-0 overflow-y-auto p-4 pt-[25vh]',
          theme,
          fontFamily
        )}
      >
        <Transition.Child
          enter='duration-300 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-fg/50' />
        </Transition.Child>
        <Transition.Child
          enter='duration-300 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            onChange={(url: string) => {
              setIsOpen(false);
              router.push(url, '_blank');
            }}
            as='div'
            className='relative mx-auto max-w-xl divide-y divide-font/50 overflow-hidden rounded-xl bg-bg shadow-2xl ring-1 ring-bg/5'
          >
            <div className='flex items-center px-4'>
              <FaSearch className='h-4 w-4 text-font' />
              <Combobox.Input
                autoFocus={true}
                autoComplete='off'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(e.target.value);
                }}
                placeholder='Type to search'
                className='h-12 w-full border-0 bg-transparent text-sm text-fg placeholder-font caret-hl focus:ring-0'
              />
            </div>

            {filteredResults.length > 0 && (
              <Combobox.Options
                static
                className='scrollbar max-h-96 overflow-y-scroll py-4 text-sm'
              >
                {filteredResults.map((result) => {
                  return (
                    <Combobox.Option key={result.name} value={result.url}>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? 'bg-hl' : 'bg-bg'
                          } cursor-pointer space-x-1 px-4 py-2`}
                        >
                          <span
                            className={`font-medium ${
                              active ? 'text-bg' : ' text-hl'
                            }`}
                          >
                            {result.name}
                          </span>
                          <span
                            className={`${
                              active ? 'text-bg/80' : 'text-hl-80'
                            }`}
                          >
                            {result.url}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  );
                })}
              </Combobox.Options>
            )}
            {query && filteredResults.length === 0 && (
              <p className='p-4 text-sm text-hl/80'>No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
