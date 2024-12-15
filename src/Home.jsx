/** @format */
import Selector from './Selector';
import DisplayNames from './DisplayNames';

const Home = ({ data }) => {
  const {
    names,
    number,
    setNumber,
    gender,
    setGender,
    generatedNames,
    setGeneratedNames,
    getName,
    length,
    favouriteNames,
    setFavouriteNames,
    percent,
    setPercent,
  } = data;

  const generateNames = () => {
    try {
      let name;
      names.forEach((item) => {
        if (gender === item.title) {
          name = item.names;
        }
      });
      const newNames = [];

      for (let i = 0; i < number; i++) {
        let fullName = '';
        for (let j = 0; j < length; j++) {
          fullName += name[Math.floor(Math.random() * name.length)].name + ' ';
        }
        newNames.push({
          id: newNames.length === 0 ? 1 : newNames[newNames.length - 1].id + 1,
          name: fullName.trim(),
        });
      }

      setGeneratedNames(newNames);
      setPercent(0);
    } catch {
      console.log('Error generating names.');
    }
  };

  const getMessage = () => {
    let message;
    if (percent <= 20) {
      message = 'Searching for the perfect names...';
    } else if (percent <= 40) {
      message = 'Selection in progress...';
    } else if (percent <= 60) {
      message = 'Almost ready...';
    } else if (percent <= 80) {
      message = 'Finalizing your name options...';
    } else if (percent <= 100) {
      message = 'Names generated!';
    }
    return message;
  };

  const getColor = () => {
    let color;
    let textColor;
    if (percent <= 20) {
      color = 'bg-red-500';
      textColor = 'text-red-500';
    } else if (percent <= 50) {
      color = 'bg-orange-500';
      textColor = 'text-orange-500';
    } else if (percent <= 80) {
      color = 'bg-yellow-500';
      textColor = 'text-yellow-500';
    } else if (percent <= 100) {
      color = 'bg-green-500';
      textColor = 'text-green-500';
    }
    return { color, textColor };
  };

  return (
    <div className='Home'>
      <div className='flex gap-x-2 items-center h-12 mb-2'>
        <input
          maxLength='3'
          onChange={(e) => setNumber(e.target.value)}
          value={Number(number) || Number(number) === 0 ? number : ''}
          className='w-full h-full outline-blue-500 border border-gray-200 pl-2 pr-2 rounded-md'
          placeholder='Number of names'
        />

        <Selector data={['Girl', 'Boy']} value={gender} setValue={setGender} />
        <button
          onClick={() => {
            if (percent === 100 && Number(number) !== 0) {
              generateNames();
            }
          }}
          className='transition-all border h-full hover:bg-slate-100 hover:border-blue-500 border-gray-200 flex items-center gap-x-2 justify-center p-2 rounded-lg '
        >
          Generate
        </button>
      </div>
      <div className='grid gap-y-2'>
        {percent === 100 ? (
          generatedNames.length !== 0 ? (
            <DisplayNames
              data={{
                getName,
                favouriteNames,
                setFavouriteNames,
                generatedNames,
              }}
            />
          ) : (
            <div className='font-medium text-lg mt-3 text-center'>
              Generated names will be shown here.
            </div>
          )
        ) : (
          <>
            <div className='h-6 m-2 '>
              <div
                style={{
                  width: `${percent}%`,
                }}
                className={`${getColor().color} rounded-md h-full text-center`}
              >
                {percent}%
              </div>
            </div>
            <div
              className={`font-medium ${
                getColor().textColor
              } text-sm mt-3 text-center`}
            >
              {getMessage()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
