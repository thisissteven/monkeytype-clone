import * as React from 'react';

export default function TableSkeleton() {
  return (
    <tbody>
      <tr className='h-14 w-full animate-pulse border-t-4 border-hl'>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
      </tr>
      <tr className='h-14 w-full animate-pulse border-t-4 border-hl'>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
      </tr>
      <tr className='h-14 w-full animate-pulse border-t-4 border-hl'>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
        <td className='bg-fg'></td>
      </tr>
      <tr className='h-14 w-full animate-pulse border-t-4 border-hl'>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
        <td className='bg-fg/80'></td>
      </tr>
    </tbody>
  );
}
