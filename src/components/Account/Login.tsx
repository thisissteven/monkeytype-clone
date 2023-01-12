import * as React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { FcGoogle } from 'react-icons/fc';

import useAuth from '@/hooks/useAuth';
import useProfile from '@/hooks/useProfile';

import Button from '../Button/Button';

export default function Login() {
  const { isValidating, login } = useAuth();
  const { isLoading } = useProfile();

  return (
    <Button
      disabled={isValidating || isLoading}
      onClick={login}
      className='flex items-center justify-center'
    >
      {isValidating || isLoading ? (
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
