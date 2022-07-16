import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import * as yup from 'yup';

import Input from '../Input';
import PasswordInput from '../PasswordInput';

const schema = yup.object().shape({
  username: yup.string().required('Userame is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
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

  const onSubmit = (data: RegisterInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
          <button
            type='submit'
            className='flex items-center justify-center rounded-md bg-font px-4 py-2 text-bg transition-opacity duration-200 hover:opacity-90 active:opacity-70'
          >
            <FaUserPlus className='mr-2' />
            Sign up
          </button>
        </form>
      </FormProvider>
    </>
  );
}
