/** @format */

import { useEffect, useState } from 'react';
import Name from './Name';
import getIcon from './assets/utils/getIcon';

const DisplayNames = ({ data }) => {
  const { getName, favouriteNames, setFavouriteNames, generatedNames } = data;

  const itemsPerPage = 100;
  const totalPage = Math.ceil(generatedNames.length / itemsPerPage);
  const startIndex = 0;
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [loading, setLoading] = useState(false);

  const currentItems = generatedNames.slice(startIndex, endIndex);

  const Load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEndIndex(endIndex + itemsPerPage);
    }, 500);
  };

  return (
    <div className='space-y-1'>
      {currentItems.map((n, i) => (
        <Name
          key={n.id}
          data={{ n, getName, favouriteNames, setFavouriteNames, i }}
        />
      ))}
      {endIndex < generatedNames.length && !loading && (
        <div className='flex justify-center m-3'>
          <button
            className='font-medium flex gap-x-1 shadow-md p-2 rounded-lg shadow-gray-500 hover:opacity-80 border border-transparent hover:border-blue-500 hover:bg-slate-100'
            onClick={Load}
          >
            <img className='w-5' src={getIcon('down')} />
            <span>
              {endIndex <= itemsPerPage ? 'See More...' : 'Load More...'}
            </span>
          </button>
        </div>
      )}
      {loading && (
        <div className='font-medium flex justify-center'>Loading...</div>
      )}
    </div>
  );
};

export default DisplayNames;
