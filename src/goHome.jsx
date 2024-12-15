/** @format */

import { useNavigate } from 'react-router-dom';
import getIcon from './assets/utils/getIcon';

const GoHome = () => {
  const navigate = useNavigate();

  const goHome = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate('/');
  };

  return (
    <div className='sticky top-0 z-10 bg-white pt-1 pb-1 mb-2 '>
      <button onClick={goHome} className='flex gap-x-2 items-center'>
        <img className='w-5' src={getIcon('back')} />
        <div>Go Home</div>
      </button>
    </div>
  );
};

export default GoHome;
