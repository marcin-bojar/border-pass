export const parseTimestamp = timestamp => {
  const date = new Date(timestamp);
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
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
  if (typeof isSortedDesc !== 'boolean') throw new Error('isSortedDesc argument must be a Boolean');

  if (isSortedDesc) return historyArray.sort((a, b) => a[sortBy] - b[sortBy]);
  else return historyArray.sort((a, b) => b[sortBy] - a[sortBy]);
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

export const displayTripEventsInSameRow = table => {
  for (let i = 1; i < table.rows.length; i++) {
    const tripStartEventFound = table.rows[i].cells[0].innerText;
    const tripEndEventFound = table.rows[i].cells[4].innerText;
    const isFirstRow = i === 1;
    const isLastRow = i === table.rows.length - 1;

    if (tripStartEventFound && !isLastRow) {
      //Copy border crossing's data (columns 2-4) from next row to the current row and delete next row
      for (let j = 1; j < 5; j++) {
        table.rows[i].cells[j].innerText = table.rows[i + 1].cells[j].innerText;
      }
      table.deleteRow(i + 1);
    }

    if (tripEndEventFound && !isFirstRow) {
      //Copy the tripEnd event's data (column 5) one row up, delete current row and update 'i' counter to new table's size (decrement by one)
      table.rows[i - 1].cells[4].innerText = table.rows[i].cells[4].innerText;
      table.deleteRow(i);
      i--;
    }
  }
};
