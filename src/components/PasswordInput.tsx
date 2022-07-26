import clsx from 'clsx';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { InputProps } from './Input';

export default function PasswordInput({
  placeholder = '',
  helperText,
  id,
  name,
  readOnly = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className='relative'>
        <input
          {...register(name, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
              : errors[name]
              ? 'border-hl focus:border-hl focus:outline-hl/50 focus:ring-0'
              : 'focus:border-fg focus:outline-fg/50 focus:ring-0',
            'w-full rounded-lg bg-hl text-bg shadow-b shadow-hl/50 placeholder:text-bg/70 focus:shadow-none'
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />

        {showPassword ? (
          <div
            className='absolute right-0 top-0 flex h-full w-[42px] transform cursor-pointer items-center justify-center transition-all duration-200 hover:bg-bg/10'
            onClick={() => setShowPassword(false)}
          >
            <FaEye className='text-bg/80' />
          </div>
        ) : (
          <div
            className='absolute right-0 top-0 flex h-full w-[42px] transform cursor-pointer items-center justify-center transition-all duration-200 hover:bg-bg/10'
            onClick={() => setShowPassword(true)}
          >
            <FaEyeSlash className='text-bg/80' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[name] && (
          <span className='text-sm text-hl'>
            {errors[name]?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
