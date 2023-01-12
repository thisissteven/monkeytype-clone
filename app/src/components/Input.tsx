import clsx from 'clsx';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type InputProps = {
  id: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  placeholder = '',
  helperText,
  id,
  name,
  type = 'text',
  readOnly = false,
  validation,
  className,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className='relative'>
        <input
          {...register(name, validation)}
          {...rest}
          type={type}
          name={name}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
              : errors[name]
              ? 'border-hl focus:border-hl focus:outline-hl/50 focus:ring-0'
              : 'focus:border-fg focus:outline-fg/50 focus:ring-0',
            'w-full rounded-lg bg-hl text-bg shadow-b shadow-hl/50 placeholder:text-bg/70 focus:shadow-none',
            className
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />

        {errors[name] && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <HiExclamationCircle className='text-xl text-bg/80' />
          </div>
        )}
      </div>
      <div className='mt-1 text-left'>
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
