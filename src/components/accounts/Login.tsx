import * as React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <>
      <h2 className='flex text-left text-xl font-thin'>or login</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='mt-4 flex flex-col gap-2 sm:gap-4'
      >
        <input
          type='text'
          placeholder='email'
          name='email'
          className='rounded-lg bg-fg text-bg placeholder:text-bg/70 focus:border-fg focus:outline-fg/50 focus:ring-0'
          autoComplete='off'
        />
        <div className='relative'>
          <input
            type={isVisible ? 'text' : 'password'}
            placeholder='password'
            name='password'
            className='w-full rounded-lg bg-fg text-bg placeholder:text-bg/70 focus:border-fg focus:outline-fg/50 focus:ring-0'
            autoComplete='off'
          />
          {isVisible ? (
            <div
              className='absolute right-0 top-0 flex h-full w-[42px] transform cursor-pointer items-center justify-center transition-all duration-200 hover:bg-bg/10'
              onClick={() => setIsVisible(false)}
            >
              <FaEye className='text-bg/80' />
            </div>
          ) : (
            <div
              className='absolute right-0 top-0 flex h-full w-[42px] transform cursor-pointer items-center justify-center transition-all duration-200 hover:bg-bg/10'
              onClick={() => setIsVisible(true)}
            >
              <FaEyeSlash className='text-bg/80' />
            </div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex h-4 w-4 items-center overflow-hidden rounded-sm bg-fg'>
            <input
              type='checkbox'
              id='remember'
              name='remember'
              className='border-0 bg-transparent text-transparent outline-0 ring-0'
              onChange={() => setIsChecked(!isChecked)}
            />
          </div>
          <label htmlFor='remember' className='text-fg'>
            remember me
          </label>
        </div>
        <button
          type='submit'
          className='flex items-center justify-center rounded-md bg-fg px-4 py-2 text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-70'
        >
          <FiLogIn className='mr-2' />
          Sign in
        </button>
      </form>
    </>
  );
}
