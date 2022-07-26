import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import * as yup from 'yup';

import { useAuthState } from '@/context/User/UserContext';

import Button from '../Button/Button';
import Input from '../Input';
import PasswordInput from '../PasswordInput';

const schema = yup.object().shape({
  identifier: yup
    .string()
    .email('email is invalid')
    .required('email is required'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters long'),
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
  const { reset, handleSubmit } = methods;

  const {
    state: { loading },
    login,
  } = useAuthState();

  const onSubmit = (data: LoginInput) => {
    // eslint-disable-next-line no-console
    login(data, isChecked, reset);
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
            <div className='relative flex h-4 w-4 items-center justify-center overflow-hidden rounded-sm bg-hl'>
              <input
                type='checkbox'
                id='remember'
                name='remember'
                className='absolute h-full w-full opacity-0'
                onChange={() => setIsChecked(!isChecked)}
              />
              <FaCheck
                className={`h-3 w-3 transition-colors duration-200 ${
                  isChecked ? 'text-bg' : 'text-hl'
                }`}
              />
            </div>
            <label htmlFor='remember' className='text-hl'>
              remember me
            </label>
          </div>
          <Button
            disabled={loading}
            type='submit'
            className='flex items-center justify-center'
          >
            {loading ? (
              <CgSpinner className='animate-spin' />
            ) : (
              <>
                <FiLogIn className='mr-2' />
                Sign in
              </>
            )}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
