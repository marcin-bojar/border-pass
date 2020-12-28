import React from 'react';

import './history-item.styles.scss';

const HistoryItem = ({ data: { from, to, timeAndDate } }) => {
  const { time, date } = timeAndDate;
  return (
    <li className="history-item">
      <span className="history-item__country">
        {from} &#8594; {to}
      </span>
      <div className="time-and-date">
        <span className="history-item__time">{time}</span>{' '}
        <span className="history-item__date">{date}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
