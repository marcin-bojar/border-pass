export const parseTimestamp = timestamp => {
  const date = new Date(timestamp);
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  const year = date.getFullYear();

  return {
    time: `${h}:${min}`,
    date: `${day}.${month}.${year}`,
  };
};

export const parseDate = (time, date) => {
  const dateArr = date.split('.'); // [d, m, y]
  const timeArr = time.split(':'); // [h, m]

  const newDate = dateArr.reverse().join('-');
  const newTime = timeArr.join(':');

  return Date.parse(newDate + 'T' + newTime + ':00');
};

export const sortHistoryListByTimeAndDate = (
  historyArray,
  isSortedDesc,
  sortBy = 'timestamp_ms'
) => {
  if (typeof isSortedDesc !== 'boolean')
    throw new Error('isSortedDesc argument must be a Boolean');

  if (isSortedDesc) return historyArray.sort((a, b) => b[sortBy] - a[sortBy]);
  else return historyArray.sort((a, b) => a[sortBy] - b[sortBy]);
};

export const sortUsersBorders = (user, isSortedDesc) => {
  user.borders = sortHistoryListByTimeAndDate(user.borders, isSortedDesc);
  return user;
};

export const getConfig = () => {
  const config = {
    headers: {},
  };
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
};

export const validateTimeAndDateSync = (time, date, setError) => {
  const dateRegex = /^(0[0-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[1-2])\.\d{4}$/;
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!timeRegex.test(time)) {
    setError('Niepoprawny format czasu.');
    return false;
  }

  if (!dateRegex.test(date)) {
    setError('Niepoprawny format daty.');
    return false;
  }

  return true;
};

//Service Worker utils

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    const swURL = 'sw.js';

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swURL)
        .then(reg => {
          console.log(
            'Service worker registered successfully. Scope: ' + reg.scope
          );
        })
        .catch(err => {
          console.log('Error occured while registering service worker: ' + err);
        });
    });
  }
};
