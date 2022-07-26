import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaUserPlus } from 'react-icons/fa';
import * as yup from 'yup';

import { useAuthState } from '@/context/User/UserContext';

import Button from '../Button/Button';
import Input from '../Input';
import PasswordInput from '../PasswordInput';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('userame is required')
    .min(3, 'username must at least be 3 characters long')
    .max(14, 'username cannot be more than 14 characters'),
  email: yup.string().email('Email is invalid').required('email is required'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long'),
});

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const methods = useForm<RegisterInput>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const {
    state: { loading },
    register,
  } = useAuthState();

  const onSubmit = async (data: RegisterInput) => {
    // eslint-disable-next-line no-console
    register(data);
  };

  return (
    <>
      <h2 className='flex text-left text-xl font-thin'>register</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-4 flex flex-col gap-2 sm:gap-4'
        >
          <Input
            id='username'
            name='username'
            placeholder='username'
            autoComplete='off'
          />
          <Input
            id='email'
            name='email'
            placeholder='email'
            autoComplete='off'
          />
          <PasswordInput
            id='password'
            name='password'
            placeholder='create password'
            autoComplete='off'
          />
          <Button
            type='submit'
            disabled={loading}
            className='flex items-center justify-center'
          >
            {loading ? (
              <CgSpinner className='animate-spin' />
            ) : (
              <>
                <FaUserPlus className='mr-2' />
                Sign up
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
