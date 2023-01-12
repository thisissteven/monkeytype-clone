import * as React from 'react';
import { FaCrown, FaUserCircle } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

type TableRowProps = {
  index: number;
  wpm: number;
  type: string;
  time: number;
  date: string;
  username: string;
};

const TableRow: React.FC<TableRowProps> = ({
  index,
  wpm,
  type,
  time,
  date,
  username,
}) => {
  return (
    <tr
      className={clsxm('whitespace-nowrap border-t-4 border-font/80', [
        index % 2 === 0 ? 'bg-hl' : 'bg-hl/80',
      ])}
    >
      <td className='py-3 pl-4'>
        <span className='text-bg'>
          {/* first rank */}
          {index === 0 ? <FaCrown className='my-1' /> : index + 1}
        </span>
      </td>

      <td className='px-2 md:px-0'>
        <div className='flex items-center gap-2 text-bg'>
          <FaUserCircle /> {username}
        </div>
      </td>

      <td className='px-2 text-bg md:px-0'>
        <span className={clsxm('rounded-md bg-bg px-2 py-1 text-xs text-hl')}>
          {wpm} wpm
        </span>
      </td>

      <td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0'>
        {type}
      </td>
      <td className='hidden px-2 text-sm text-bg sm:table-cell md:px-0'>
        {time}s
      </td>
      <td className='px-2 text-sm text-bg md:px-0'>{date}</td>
    </tr>
  );
};

export default TableRow;
