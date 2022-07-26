import * as React from 'react';

export default function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center rounded-sm border-b-2 border-font bg-hl px-1 text-sm font-medium text-bg ${className}`}
    >
      {children}
    </div>
  );
}
