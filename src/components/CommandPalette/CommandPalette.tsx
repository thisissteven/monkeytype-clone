import { Combobox, Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { FaSearch } from 'react-icons/fa';

import { CommandType } from '@/data/commands';

import {
  filterCommands,
  handleSelect,
} from '@/components/CommandPalette/functions';

import { usePreferenceContext } from '@/context/Preference/PreferenceContext';

const CommandPalette = ({ data }: { data: CommandType[] }) => {
  const {
    preferences: { theme, fontFamily, isOpen },
    dispatch,
  } = usePreferenceContext();

  const [commands, setCommands] = React.useState(() => data);
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState('');

  const [page, setPage] = React.useState<1 | 2>(1);

  React.useEffect(() => {
    if (selected && page === 1) {
      setQuery('');
      setPage(2);
      setCommands((commands) => {
        const selectedCommand = commands.filter(
          (item) => item.commandName === selected
        );
        if (selectedCommand.length === 0) return data;
        return selectedCommand[0].contents;
      });
    }
  }, [selected, page, data]);

  const filteredCommands = React.useMemo(
    () => filterCommands(commands, query),
    [commands, query]
  );

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (page === 2 && event.key === 'Escape') {
        setCommands(data);
        setPage(1);
        setSelected('');
        return;
      }
      if (
        (event.key === 'p' || event.key === 'k') &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  return (
    <Transition.Root
      show={isOpen}
      as={React.Fragment}
      afterLeave={() => {
        setQuery('');
        setPage(1);
        setCommands(data);
        setSelected('');
      }}
    >
      <Dialog
        onClose={() => {
          if (page === 1) dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
        }}
        className={clsx(
          'pointer-events-none fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh] font-primary',
          theme,
          fontFamily
        )}
      >
        <Transition.Child
          enter='duration-200 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-fg/50' />
        </Transition.Child>
        <Transition.Child
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            value=''
            onChange={(value: string) => {
              if (value === 'exit') {
                dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
                setQuery('');
                setPage(1);
                setCommands(data);
                setSelected('');
                return;
              }
              setSelected(value);
              if (page === 2) {
                handleSelect(selected, value, dispatch);
                setCommands(data);
                dispatch({ type: 'TOGGLE_COMMAND_PALETTE' });
              }
            }}
            as='div'
            className='pointer-events-auto relative mx-auto max-w-xl divide-y divide-font/50 overflow-hidden rounded-xl bg-bg shadow-2xl ring-1 ring-bg/5'
          >
            <div className='flex items-center px-4'>
              <FaSearch className='h-4 w-4 text-font' />
              <Combobox.Input
                autoComplete='off'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(e.target.value);
                }}
                placeholder='Type to search'
                className='h-12 w-full border-0 bg-transparent text-sm text-fg placeholder-font caret-hl focus:ring-0'
              />
            </div>

            {filteredCommands.length > 0 && (
              <Combobox.Options
                static
                className='sm:scrollbar max-h-72 overflow-y-auto py-4 text-sm'
              >
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    key={page}
                  >
                    {filteredCommands.map((command, index) => {
                      return (
                        <Combobox.Option
                          value={command.commandName}
                          key={command.commandName + index}
                        >
                          {({ active }) => {
                            return (
                              <div
                                className={`${
                                  active ? 'bg-hl' : 'bg-bg'
                                } cursor-pointer space-x-1 px-4 py-2 ${
                                  active && command.commandName
                                }`}
                              >
                                <span
                                  className={`font-medium ${
                                    active ? 'text-bg' : ' text-hl'
                                  }`}
                                >
                                  {command.commandName}
                                </span>
                                <span
                                  className={`${
                                    active ? 'text-bg/80' : 'text-hl-80'
                                  }`}
                                >
                                  {command.description}
                                </span>
                              </div>
                            );
                          }}
                        </Combobox.Option>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </Combobox.Options>
            )}
            {query && filteredCommands.length === 0 && (
              <p className='p-4 text-sm text-hl/80'>No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
