/** @format */

import Selector from './Selector';
import getIcon from './assets/utils/getIcon';
import { useEffect, useState } from 'react';
import { boyName, girlName } from './assets/data/names';
import { capitalize, exist, isOneWord } from './assets/utils/usefulFunctions';
import GoHome from './goHome';

const Settings = ({ data }) => {
  const {
    language,
    setLanguage,
    length,
    setLength,
    names,
    setNames,
    burmeseNames,
    setBurmeseNames,
  } = data;
  const [isAdding, setIsAdding] = useState(false);
  const [gender, setGender] = useState(null);

  const getMMNames = (name) => {
    return burmeseNames[capitalize(name)] || null;
  };

  const deleteName = (gender, id) => {
    const currentName = gender === 'Boy' ? names[0] : names[1];

    const newName = currentName.names.filter((item) => id !== item.id);
    const newNames = names.map((name) => {
      if (gender === name.title) {
        return { ...name, names: newName };
      } else {
        return name;
      }
    });

    setNames(newNames);
  };

  const handleAdding = (gender) => {
    setGender(gender);
    setIsAdding(!isAdding);
  };

  const restoreDefaults = () => {
    const newNames = names.map((n) => {
      return n.title === 'Boy'
        ? { ...n, names: boyName }
        : { ...n, names: girlName };
    });
    setNames(newNames);
  };

  return (
    <div className='Settings'>
      <GoHome />
      <section className='mb-2 '>
        <Title text='General' />
        <div className='p-2 border border-gray-200 rounded-2xl bg-white-50'>
          <div className='grid grid-cols-2 items-center mb-2'>
            <div>Name Language</div>
            <div>
              <Selector
                data={['English', 'Burmese']}
                value={language}
                setValue={setLanguage}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div>Length</div>
            <div>
              <Selector
                data={[1, 2, 3, 4]}
                value={length}
                setValue={setLength}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Title text='Customize' />
        <div className='p-2 border border-gray-200 rounded-2xl bg-white-50'>
          <div className='mb-2'>
            {names.map((item) => {
              return (
                <div className='relative' key={`item-${item.title}`}>
                  <div className='mb-2 font-medium'>{`${item.title} Names (${item.names.length})`}</div>
                  <div className='grid gap-y-1'>
                    {item.names.map((n, i) => {
                      return !n.isEditing ? (
                        <Name
                          key={i}
                          data={{
                            n,
                            getMMNames,
                            deleteName,

                            gender: item.title,
                            names,
                            setNames,
                          }}
                        />
                      ) : (
                        <EditingName
                          key={i}
                          data={{
                            n,
                            getMMNames,
                            deleteName,
                            names,
                            setNames,
                            gender: item.title,
                          }}
                        />
                      );
                    })}
                  </div>
                  {isAdding && gender === item.title && (
                    <AddName
                      data={{
                        gender,
                        names,
                        setNames,
                        setIsAdding,
                        getMMNames,
                        burmeseNames,
                        setBurmeseNames,
                      }}
                    />
                  )}
                  <div className='sticky bottom-1 flex justify-center'>
                    <button
                      onClick={() => handleAdding(item.title)}
                      className='bg-white p-1 shadow-sm shadow-gray-300 rounded-full border border-gray-200'
                    >
                      <img className='w-7' src={getIcon('plus')} />
                    </button>
                  </div>
                  <div className='border mt-2 mb-2 border-dashed border-gray-300 '></div>
                </div>
              );
            })}
          </div>
          <div>
            <button
              onClick={restoreDefaults}
              className='p-2 border bg-slate-200 border-gray-200 rounded-lg'
            >
              Restore defaults
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Title = ({ text }) => {
  return <div className='font-medium mb-2'>{text}</div>;
};

const Name = ({ data }) => {
  const { n, deleteName, gender, names, setNames } = data;

  const editName = (id) => {
    const currentName = gender === 'Boy' ? names[0].names : names[1].names;

    const newName = currentName.map((cn) => {
      if (id === cn.id) {
        cn.isEditing = true;
      } else {
        cn.isEditing = false;
      }

      return cn;
    });

    const newNames = names.map((nn) => {
      if (nn.gender === gender) {
        nn.names = newName;
      }

      return nn;
    });
    setNames(newNames);
  };

  return (
    <div className='flex min-h-20 justify-between border border-gray-300 gap-x-3 bg-gray-50 rounded-md items-stretch mb-1'>
      <div className='p-2  '>
        <div>{n.name}</div>
        <div>{n.mm}</div>
      </div>
      <div className='flex gap-x-1'>
        <button
          onClick={() => editName(n.id)}
          className='flex gap-x-1 items-center justify-center p-1 rounded-tr-md rounded-br-md'
        >
          <img className='w-7 ' src={getIcon('edit')} />
        </button>
        <button
          className='flex gap-x-1 items-center justify-center p-1 rounded-tr-md rounded-br-md'
          onClick={() => deleteName(gender, n.id)}
        >
          <img className='w-7 ' src={getIcon('deleteIcon')} />
        </button>
      </div>
    </div>
  );
};

const EditingName = ({ data }) => {
  const { n, gender, names, setNames } = data;

  const [enName, setEnName] = useState(n.name);
  const [mmName, setMmName] = useState(n.mm);

  const cancel = () => {
    const currentName = gender === 'Boy' ? names[0].names : names[1].names;

    const newName = currentName.map((cn) => {
      cn.isEditing = false;
      return cn;
    });

    const newNames = names.map((nn) => {
      if (nn.gender === gender) {
        nn.names = newName;
      }

      return nn;
    });
    setNames(newNames);
  };

  const saveName = (id) => {
    const currentName = gender === 'Boy' ? names[0].names : names[1].names;

    const newName = currentName.map((cn) => {
      if (id === cn.id) {
        cn.name = enName;
        cn.mm = mmName;
      }

      return cn;
    });

    const newNames = names.map((nn) => {
      if (nn.gender === gender) {
        nn.names = newName;
      }

      return nn;
    });
    setNames(newNames);
    cancel();
  };

  return (
    <div className='flex min-h-20 justify-between border border-gray-300 gap-x-3 bg-gray-50 rounded-md items-stretch mb-1'>
      <div className='p-2 grid w-3/4 gap-y-1'>
        <input
          autoFocus
          className='border border-gray-200 outline-blue-400 h-10 pl-2 pr-2 rounded-md bg-transparent'
          placeholder='Enter English Name'
          onChange={(e) => setEnName(e.target.value)}
          value={enName}
        />
        <input
          className='border border-gray-200 outline-blue-400 h-10 pl-2 pr-2 rounded-md bg-transparent'
          placeholder='Enter Burmese Name'
          onChange={(e) => setMmName(e.target.value)}
          value={mmName}
        />
      </div>
      <div className='flex gap-x-1'>
        <button
          onClick={cancel}
          className='flex gap-x-1 items-center justify-center p-1 rounded-tr-md rounded-br-md'
        >
          <img className='w-7 ' src={getIcon('cancel')} />
        </button>
        <button
          onClick={() => saveName(n.id)}
          className='flex gap-x-1 items-center justify-center p-1 rounded-tr-md rounded-br-md'
        >
          <img className='w-7 ' src={getIcon('save')} />
        </button>
      </div>
    </div>
  );
};

const AddName = ({ data }) => {
  const {
    gender,
    names,
    setNames,
    setIsAdding,
    getMMNames,
    burmeseNames,
    setBurmeseNames,
  } = data;
  const currentNames = gender === 'Boy' ? names[0].names : names[1].names;
  const [englishName, setEnglishName] = useState('');
  const [burmeseName, setBurmeseName] = useState('');
  const okToAdd = englishName.trim() && burmeseName.trim();
  const isExist = exist(capitalize(englishName.trim()), currentNames);
  const oneWord = isOneWord(englishName);

  const cancel = () => {
    setIsAdding(false);
    const newNames = names[1].names.map((n) => {
      return { ...n, mm: getMMNames(n.name), isEditing: false };
    });
    console.log(newNames);
  };

  useEffect(() => {
    setBurmeseName(getMMNames(englishName.trim()) || '');
  }, [englishName]);

  const addName = () => {
    if (okToAdd && !isExist && oneWord) {
      const newName = [
        ...currentNames,
        {
          id:
            currentNames.length === 0
              ? 1
              : currentNames[currentNames.length - 1].id + 1,
          name: capitalize(englishName.trim()),
          mm: burmeseName.trim(),
        },
      ];

      const newNames = names.map((n) => {
        if (n.title === gender) {
          return { ...n, names: newName };
        } else {
          return n;
        }
      });

      setNames(newNames);
      setIsAdding(false);
    }
  };

  return (
    <div className='p-2 border border-gray-200 rounded-md mt-1 mb-1 bg-gray-100'>
      <div>
        <div className='flex items-center gap-x-2'>
          <div className='w-24 '>English</div>
          <input
            autoFocus
            onChange={(e) => setEnglishName(e.target.value)}
            value={englishName}
            placeholder='Enter English Name'
            className='outline-1 focus:outline-blue-500 mt-1 rounded-lg h-11 w-full p-1 border border-gray-200 outline-none '
          />
        </div>
        <div className='flex items-center gap-x-2'>
          <div className='w-24 '>Burmese</div>
          <input
            onChange={(e) => setBurmeseName(e.target.value)}
            value={burmeseName}
            placeholder='Enter Burmese Name'
            className='outline-1 focus:outline-blue-500 mt-1 rounded-lg h-11 w-full p-1 border border-gray-200 outline-none '
          />
        </div>
      </div>
      <div className='mt-2 flex gap-x-2'>
        <button
          onClick={addName}
          className='p-2 border bg-slate-200 border-gray-200 rounded-lg'
        >
          Add
        </button>
        <button
          onClick={cancel}
          className='p-2 border bg-slate-200 border-gray-200 rounded-lg'
        >
          Cancel
        </button>
      </div>
      {isExist && (
        <div className='text-red-500 font-medium mb-1 mt-1'>
          This name is already in the list.
        </div>
      )}
      {!oneWord && (
        <div className='text-red-500 font-medium mb-1 mt-1'>
          English Name must be one word.
        </div>
      )}
      {!okToAdd && (
        <div className='text-red-500 font-medium mb-1 mt-1'>
          Fill in the forms.
        </div>
      )}
    </div>
  );
};

export default Settings;
