/** @format */

export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getStorage(key) {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data) || null;
  } catch {
    console.log('There is an error!');
  }
}

export function exist(name, array) {
  let isExist = false;

  array.forEach((n) => {
    if (n.name === name) {
      isExist = true;
    }
  });

  return isExist;
}

export function capitalize(name) {
  let capitalizedName = '';
  const nameArray = name.split('');
  nameArray.forEach((n, i) => {
    if (i === 0) {
      capitalizedName += n.toUpperCase();
    } else {
      capitalizedName += n.toLowerCase();
    }
  });

  return capitalizedName;
}

export function isOneWord(words) {
  const wordsArray = words.trim().split(' ');
  return wordsArray.length === 1 ? true : false;
}
