/** @format */

import Name from './Name';
import GoHome from './goHome';

const Favourites = ({ data }) => {
  const { favouriteNames, setFavouriteNames, getName } = data;

  return (
    <div className='Favourites'>
      <GoHome />
      <div className='space-y-1'>
        {favouriteNames.length ? (
          favouriteNames.map((n, i) => (
            <Name
              key={n.id}
              data={{ n, getName, favouriteNames, setFavouriteNames, i }}
            />
          ))
        ) : (
          <div className='font-medium text-lg mt-3 text-center'>
            Added names will be shown here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
