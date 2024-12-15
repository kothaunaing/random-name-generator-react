/** @format */

import { useState } from 'react';
import getIcon from './assets/utils/getIcon';
import { exist } from './assets/utils/usefulFunctions';

const Name = ({ data }) => {
  const { n, getName, favouriteNames, setFavouriteNames, i } = data;
  const [isCopied, setIsCopied] = useState(false);
  const added = exist(n.name, favouriteNames);
  const [show, setShow] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(getName(n.name));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const addOrRemove = () => {
    const isExist = exist(n.name, favouriteNames);
    if (!isExist) {
      const newNames = [
        ...favouriteNames,
        {
          id:
            favouriteNames.length === 0
              ? 1
              : favouriteNames[favouriteNames.length - 1].id + 1,
          name: n.name,
        },
      ];
      setFavouriteNames(newNames);
    } else {
      const newNames = favouriteNames.filter((fn) => {
        return fn.name !== n.name;
      });
      setFavouriteNames(newNames);
    }
  };

  return (
    <div
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
      className='transition-all p-2 flex justify-between border border-transparent hover:border-gray-300 shadow-sm shadow-gray-200 rounded-lg'
    >
      <div className='p-2 flex gap-x-3'>
        <div>{i + 1}</div>
        <div>{getName(n.name)}</div>
      </div>
      {show && (
        <div className='flex gap-x-2'>
          <button onClick={addOrRemove}>
            <img className='w-6' src={getIcon(added ? 'added' : 'add')} />
          </button>
          <button className='flex gap-x-1 items-center' onClick={copy}>
            <img className='w-6' src={getIcon(isCopied ? 'copied' : 'copy')} />
            {isCopied && <div className='text-sm font-medium'>Copied</div>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Name;
