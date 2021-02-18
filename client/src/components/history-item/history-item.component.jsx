import React, { useContext } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './history-item.styles.scss';

const HistoryItem = ({ data }) => {
  const { type, from, to, time, date, i } = data;
  const { editMode, setEditedItem, isSortedDesc, borders } = useContext(
    AppContext
  );

  return (
    <li
      className="history-item"
      onClick={() => {
        if (editMode) setEditedItem(data);
      }}
    >
      {type === 'borderPass' && (
        <div className="history-item__border">
          <div className="history-item__block">
            <span className="history-item__nr">
              {isSortedDesc ? borders.length - i : i + 1}.{' '}
            </span>
            <span className="history-item__country">
              {from} &#8594; {to}
            </span>
          </div>
          <div className="hisotry-item__block">
            <span className="history-item__time">{time}</span>{' '}
            <span className="history-item__date">{date}</span>
          </div>
        </div>
      )}

      {type !== 'borderPass' && (
        <div className="history-item__event">
          <div className="history-item__block">
            {type === 'delegationStart' ? 'Wyjazd z bazy' : 'Powrót na bazę'}
          </div>
          <div className="history-item__block">
            <span className="history-item__time">{time}</span>{' '}
            <span className="history-item__date">{date}</span>
          </div>
        </div>
      )}
    </li>
  );
};

export default HistoryItem;
