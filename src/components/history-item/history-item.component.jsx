import React, { useContext } from 'react';

import './history-item.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const HistoryItem = ({ data }) => {
  const { from, to, time, date, i } = data;
  const { editMode, setEditedItem } = useContext(AppContext);

  return (
    <li
      className="history-item"
      onClick={() => {
        if (editMode) setEditedItem(data);
      }}
    >
      <div className="index-and-border">
        <span className="history-item__nr">{i + 1}. </span>
        <span className="history-item__country">
          {from} &#8594; {to}
        </span>
      </div>
      <div className="time-and-date">
        <span className="history-item__time">{time}</span>{' '}
        <span className="history-item__date">{date}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
