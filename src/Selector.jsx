/** @format */

import { useEffect, useRef, useState } from 'react';
import getIcon from './assets/utils/getIcon';

const Selector = ({ data, value, setValue }) => {
  const [isExpended, setIsExpended] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsExpended(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className='h-full relative flex flex-col items-center'>
      <button
        onClick={() => setIsExpended(!isExpended)}
        className='transition-all border hover:bg-slate-100 hover:border-blue-500  min-h-12 min-w-28 border-gray-200 flex items-center gap-x-2 justify-between p-2 rounded-lg'
      >
        <div>{value}</div>
        <img className='w-5' src={getIcon(isExpended ? 'up' : 'down')} />
      </button>
      {isExpended && (
        <div className='absolute mt-1 min-w-40 grid gap-y-1 border border-gray-200 p-1 z-10 bg-white top-12 rounded-lg'>
          {data.map((d) => (
            <button
              key={d}
              className={`rounded-md p-1 ${d === value ? ' font-medium' : ''}`}
              onClick={() => {
                setValue(d);
                setIsExpended(false);
              }}
            >
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Selector;
