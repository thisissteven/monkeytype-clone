import { useRouter } from 'next/router';
import * as React from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Code() {
  const { query } = useRouter();

  return (
    <span
      onClick={() =>
        navigator.clipboard.writeText(query?.id as string).then(() =>
          toast.success('Copied successfully!', {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'copy-success',
            autoClose: 3000,
          })
        )
      }
      className='relative z-10 flex cursor-pointer items-center rounded-md bg-hl px-4 pt-5 text-3xl font-bold text-bg'
    >
      <span className='absolute top-0 left-0 whitespace-nowrap px-4 pt-1 text-xs text-bg'>
        copy and share
      </span>
      {query?.id ? (
        query?.id + ' '
      ) : (
        <div className='flex animate-pulse flex-col'>
          <div className='mb-1 mt-1 h-2 w-12 rounded-lg bg-bg/80'></div>
          <div className='mb-2 h-2 w-28 rounded-lg bg-bg/80'></div>
        </div>
      )}
      <FaCopy className='ml-2 text-2xl text-bg/80 transition-colors duration-200 hover:text-bg active:text-bg' />
    </span>
  );
}
