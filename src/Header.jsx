/** @format */

import { useState } from 'react';
import getIcon from './assets/utils/getIcon';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ data }) => {
  const { favouriteNames } = data;
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const homeActive = location.pathname === '/';
  const settingsActive = location.pathname === '/settings';
  const favouritesActive = location.pathname === '/favourites';

  const pages = [
    {
      name: 'Home',
      active: homeActive,
      path: '/',
      image: 'home',
      bgColor: 'bg-red-300',
      borderColor: 'red',
      hoverColor: 'hover:bg-red-300',
    },
    {
      name: 'Favourites',
      active: favouritesActive,
      path: '/favourites',
      image: 'favourite',
      items: favouriteNames.length,
      bgColor: 'bg-blue-300',
      borderColor: 'blue',
      hoverColor: 'hover:bg-blue-300',
    },
    {
      name: 'Settings',
      active: settingsActive,
      path: '/settings',
      image: 'setting',
      bgColor: 'bg-orange-300',
      borderColor: 'orange',
      hoverColor: 'hover:bg-orange-300',
    },
  ];

  const changePage = (path) => {
    navigate(path);
  };

  return (
    <header className='bg-white border-b border-b-gray-200 pb-2'>
      <div className='h-1 small-bar'></div>
      <div className='flex items-center p-1 justify-between'>
        <div className='font-bold text-blue-700 text-lg uppercase'>
          Random Names Generator
        </div>
        <button
          className={`${isOpen ? 'bg-gray-100' : ''} rounded-full p-2`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className='w-7' src={getIcon(isOpen ? 'cancel' : 'menu')} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`transition-all mt-2 duration-500 border-t border-t-gray-200 p-1 ${
            !isOpen ? 'hidden opacity-0' : 'block opacity-100'
          }`}
        >
          <div className='grid items-center border-l-2 border-l-gray-300'>
            {pages.map((p) => {
              return (
                <div
                  key={p.name}
                  onClick={() => changePage(p.path)}
                  className={`relative border border-transparent border-dotted transition-all  ${
                    p.active
                      ? `bg-blue-300`
                      : ` hover:border-gray-500 hover:bg-gray-100 hover:text-black`
                  } cursor-pointer font-bold p-2 pl-3 pr-3`}
                >
                  <div className='flex gap-x-2'>
                    <img className='w-5 ' src={getIcon(p.image)} />
                    <div>{p.name}</div>
                    {p.items >= 0 && <div>({p.items})</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
