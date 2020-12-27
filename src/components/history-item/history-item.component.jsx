import React from 'react';

import './history-item.styles.scss';

const HistoryItem = ({ data: { from, to, timeAndDate } }) => {
  return (
    <li className="history-item">
      <span className="history-item__country">{`${from} --> ${to}`}</span>{' '}
      <span className="history-item__date">{`${timeAndDate}`}</span>
    </li>
  );
};

export default HistoryItem;
