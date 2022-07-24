import { useRouter } from 'next/router';
import * as React from 'react';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Code() {
  const { query } = useRouter();

  return (
    <div className='relative bottom-[5.5rem] flex w-full max-w-[950px] flex-col items-end'>
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
        className='relative flex cursor-pointer items-center rounded-md bg-hl px-4 pt-5 text-3xl font-bold text-bg'
      >
        <span className='absolute top-0 left-0 px-4 pt-1 text-xs text-bg'>
          copy and share
        </span>
        {query?.id}{' '}
        <FaCopy className='ml-2 text-2xl text-bg/80 transition-colors duration-200 hover:text-bg active:text-bg' />
      </span>
    </div>
  );
}
