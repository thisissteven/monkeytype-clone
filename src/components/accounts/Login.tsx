import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import * as yup from 'yup';

import { useAuthState } from '@/context/User/UserContext';

import Input from '../Input';
import PasswordInput from '../PasswordInput';

const schema = yup.object().shape({
  identifier: yup
    .string()
    .email('Email is invalid')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

type LoginInput = {
  identifier: string;
  password: string;
};

export default function Login() {
  const [isChecked, setIsChecked] = React.useState(false);

  const methods = useForm<LoginInput>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const { login } = useAuthState();

  const onSubmit = (data: LoginInput) => {
    // eslint-disable-next-line no-console
    login(data);
  };

  return (
    <>
      <h2 className='flex text-left text-xl font-thin'>or login</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-4 flex flex-col gap-2 sm:gap-4'
        >
          <Input
            name='identifier'
            id='login-email'
            placeholder='email'
            autoComplete='off'
          />
          <PasswordInput
            name='password'
            id='login-password'
            placeholder='password'
            autoComplete='off'
          />
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
            className='flex items-center justify-center rounded-md bg-font px-4 py-2 text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-70'
          >
            <FiLogIn className='mr-2' />
            Sign in
          </button>
        </form>
      </FormProvider>
    </>
  );
}
