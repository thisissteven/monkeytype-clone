import * as React from 'react';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        className={`outline-solid active:bg-fg-80 mb-8 transform rounded-lg bg-fg px-3 py-2 font-primary text-bg shadow-b shadow-fg/50 outline-offset-[6px] transition-all duration-200 hover:bg-fg/90 focus:outline-dashed focus:outline-[3px] focus:outline-fg/50 active:translate-y-[4px] active:shadow-none ${className}`}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
