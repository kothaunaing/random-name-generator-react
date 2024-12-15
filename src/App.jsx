/** @format */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import { useEffect, useState } from 'react';
import Settings from './Settings';
import defaultSettings from './assets/data/defaultSettings';
import { getStorage, saveToLocalStorage } from './assets/utils/usefulFunctions';
import Favourites from './Favourites';

function App() {
  const [settings, setSettings] = useState(
    getStorage('randomNamesSettings') || {}
  );
  const [number, setNumber] = useState(
    settings.number || defaultSettings.number
  );
  const [gender, setGender] = useState(
    settings.gender || defaultSettings.gender
  );
  const [generatedNames, setGeneratedNames] = useState(
    settings.generatedNames || defaultSettings.generatedNames
  );
  const [favouriteNames, setFavouriteNames] = useState(
    settings.favouriteNames || defaultSettings.favouriteNames
  );
  const [language, setLanguage] = useState(
    settings.language || defaultSettings.language
  );
  const [length, setLength] = useState(
    settings.length || defaultSettings.length
  );
  const [names, setNames] = useState(settings.names || defaultSettings.names);
  const [burmeseNames, setBurmeseNames] = useState(
    settings.burmeseNames || defaultSettings.burmeseNames
  );
  const [percent, setPercent] = useState(100);

  const getTranslations = () => {
    names.forEach((n) => {
      n.names.forEach((item) => {
        const { name, mm } = item;
        burmeseNames[name] = mm;
      });
    });
  };

  useEffect(() => {
    getTranslations();
  }, [names]);

  const getName = (name) => {
    if (language === 'English') {
      return name;
    } else {
      let fullName = '';
      const nameArray = name.trim().split(' ');
      nameArray.forEach((n) => {
        fullName += burmeseNames[n];
      });
      return fullName;
    }
  };

  const saveStorage = (key, value) => {
    useEffect(() => {
      const newSettings = {
        ...settings,
        [key]: value,
      };
      setSettings(newSettings);
    }, [value]);
  };

  saveStorage('language', language);
  saveStorage('gender', gender);
  saveStorage('length', length);
  saveStorage('generatedNames', generatedNames);
  saveStorage('favouriteNames', favouriteNames);
  saveStorage('names', names);
  saveStorage('burmeseNames', burmeseNames);
  saveStorage('number', number);

  useEffect(() => {
    saveToLocalStorage('randomNamesSettings', settings);
  }, [settings]);

  const getMilliSecond = () => {
    let milliSecond;
    if (number <= 50) {
      milliSecond = 15;
    } else if (number <= 100) {
      milliSecond = 25;
    } else if (number <= 200) {
      milliSecond = 35;
    } else if (number <= 400) {
      milliSecond = 45;
    } else if (number <= 600) {
      milliSecond = 55;
    } else if (number <= 800) {
      milliSecond = 65;
    } else if (number <= 999) {
      milliSecond = 75;
    }

    return milliSecond;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(Math.min(percent + 1, 100));
    }, getMilliSecond());

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <div className='App min-h-screen flex flex-col items-center'>
      <div className='flex-1 w-full sm:w-5/6 md:w-4/5 lg:w-4/6'>
        <Router>
          <Header data={{ favouriteNames }} />
          <div className='h-0.5'>
            <div
              style={{
                width: `${percent}%`,
              }}
              className='h-full bg-blue-500'
            ></div>
          </div>
          <div className='p-2'>
            <Routes>
              <Route
                path='/'
                exact
                element={
                  <Home
                    data={{
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
                    }}
                  />
                }
              />
              <Route
                path='/settings'
                element={
                  <Settings
                    data={{
                      language,
                      setLanguage,
                      length,
                      setLength,
                      names,
                      setNames,
                      burmeseNames,
                      setBurmeseNames,
                    }}
                  />
                }
              />
              <Route
                path='/favourites'
                element={
                  <Favourites
                    data={{ favouriteNames, getName, setFavouriteNames }}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
