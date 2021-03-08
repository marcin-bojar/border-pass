import React, { useContext, useState } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './history-item.styles.scss';

const HistoryItem = ({ data }) => {
  const { type, from, to, time, date, i } = data;
  const {
    editMode,
    sendMode,
    setEditedItem,
    isSortedDesc,
    borders,
  } = useContext(AppContext);
  const [selected, setSelected] = useState(false);
  const isTripStart = type === 'tripStart';
  const isTripEnd = type === 'tripEnd';

  return (
    <li
      className={`${isTripStart ? 'trip-start' : ''} ${
        isTripEnd ? 'trip-end' : ''
      } ${selected ? 'selected' : ''} history-item`}
      onClick={() => {
        if (editMode) setEditedItem(data);
        if (sendMode) setSelected(!selected);
      }}
    >
      <div className="history-item__event">
        <div className="history-item__block">
          <span className="history-item__nr">
            {isSortedDesc ? borders.length - i : i + 1}.{' '}
          </span>
          {type === 'borderPass' ? (
            <span className="history-item__country">
              {from} &#8594; {to}
            </span>
          ) : (
            <span className="history-item__event-type">
              {type === 'tripStart' ? 'Wyjazd z bazy' : 'Powrót na bazę'}
            </span>
          )}
        </div>
      </div>

      <div className="history-item__block">
        <span className="history-item__time">{time}</span>{' '}
        <span className="history-item__date">{date}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
