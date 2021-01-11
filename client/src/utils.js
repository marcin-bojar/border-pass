export const parseTimestamp = timestamp => {
  const date = new Date(timestamp);
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    time: `${h}:${min}`,
    date: `${day}.${month}.${year}`,
  };
};

export const parseDate = (time, date) => {
  const dateArr = date.split('.'); // [d, m, y]
  const timeArr = time.split(':'); // [h, m]

  for (let i = 0; i < 2; i++) {
    if (parseInt(dateArr[i]) < 10) dateArr[i] = '0' + dateArr[i];
    if (parseInt(timeArr[i]) < 10) timeArr[i] = '0' + timeArr[i];
  }

  const newDate = dateArr.reverse().join('-');
  const newTime = timeArr.join(':');

  return Date.parse(newDate + 'T' + newTime + ':00');
};

export const sortHistoryListByTimeAndDate = (historyArray, isSortedDesc) => {
  if (typeof isSortedDesc !== 'boolean')
    throw new Error('isSortedDesc argument must be a Boolean');

  if (isSortedDesc)
    return historyArray.sort((a, b) => b.timestamp_ms - a.timestamp_ms);
  else return historyArray.sort((a, b) => a.timestamp_ms - b.timestamp_ms);
};

//Service Worker utils

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    const swURL = '/border-pass/sw.js';

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
