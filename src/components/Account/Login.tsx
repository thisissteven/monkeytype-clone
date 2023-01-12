import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FcGoogle } from 'react-icons/fc';

import useUser from '@/hooks/useUser';

import Button from '../Button/Button';

export default function Login() {
  const { isValidating, login } = useUser();

  return (
    <Button
      disabled={isValidating}
      onClick={login}
      className='flex items-center justify-center'
    >
      {isValidating ? (
        <CgSpinner className='animate-spin' />
      ) : (
        <>
          <FcGoogle className='mr-2' />
          Sign in
        </>
      )}
    </Button>
  );
}
