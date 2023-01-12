import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TooltipProps = {
  triangle?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Tooltip({
  triangle,
  children,
  className,
  ...rest
}: TooltipProps) {
  return (
    <div
      className={clsxm(
        'absolute top-10 right-1/2 z-10 flex translate-x-1/2 -translate-y-2 transform whitespace-nowrap rounded-md bg-hl px-2 py-1 text-center text-sm text-bg opacity-0 transition-all duration-200',

        className
      )}
      {...rest}
    >
      <div className='relative z-20 font-primary'>{children}</div>
      <div
        className={clsxm(
          'absolute left-1/2 -top-[2px] h-4 w-4 -translate-x-1/2 rotate-45 transform bg-hl',
          triangle
        )}
      ></div>
    </div>
  );
}
