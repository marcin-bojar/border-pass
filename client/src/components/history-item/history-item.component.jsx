import React, { useContext, useState, forwardRef } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './history-item.styles.scss';

const HistoryItem = forwardRef(({ data }, ref) => {
  const { type, from, to, name, time, date, i } = data;
  const {
    dataState: { historyList, isSortedDesc, selection },
    generalState: { editMode, sendMode, isSendingArchive },
    setDataState,
  } = useContext(AppContext);

  const [selected, setSelected] = useState(false);
  const isTripStart = type === 'tripStart';
  const isTripEnd = type === 'tripEnd';

  const handleSelection = () => {
    const { startIndex, endIndex } = selection;

    if (startIndex === null)
      setDataState({ type: 'SET_SELECTION', payload: { ...selection, startIndex: i } });
    else if (startIndex !== null && i === startIndex) setDataState({ type: 'CLEAR_SELECTION' });
    else if (startIndex !== null && endIndex === null && i > startIndex)
      setDataState({ type: 'SET_SELECTION', payload: { ...selection, endIndex: i } });
    else setDataState({ type: 'SET_SELECTION', payload: { startIndex: i, endIndex: null } });
  };

  return (
    <li
      className={`${isTripStart ? 'trip-start' : ''} ${isTripEnd ? 'trip-end' : ''} ${
        selected ? 'selected' : ''
      } history-item`}
      onClick={() => {
        if (editMode) setDataState({ type: 'SET_EDITED_ITEM', payload: data });
        else if (sendMode) {
          if (isSendingArchive) return;
          setSelected(!selected);
          handleSelection();
        }
      }}
      ref={ref}
    >
      <div className="history-item__event">
        <div className="history-item__block">
          <span className="history-item__nr">
            {isSortedDesc ? historyList.length - i : i + 1}.{' '}
          </span>
          {type === 'borderPass' ? (
            <span className="history-item__country">
              {from} &#8594; {to}
            </span>
          ) : (
            <span className="history-item__event-type">
              {type === 'place' ? name : type === 'tripStart' ? 'Wyjazd z bazy' : 'Powrót na bazę'}
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
});

export default HistoryItem;
