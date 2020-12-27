export const parseDate = timestamp => {
  const date = new Date(timestamp);
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${`${h}:${min} ${day} ${month} ${year}`}`;
};
