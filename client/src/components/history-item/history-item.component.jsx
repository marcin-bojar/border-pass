import React, { useContext, useState, forwardRef } from 'react';

import { AppContext } from '../../hooks/useAppState';

import './history-item.styles.scss';

const HistoryItem = forwardRef(({ data }, ref) => {
  const { type, from, to, time, date, i } = data;
  const {
    editMode,
    sendMode,
    setEditedItem,
    isSortedDesc,
    borders,
    selection,
    setSelection,
  } = useContext(AppContext);
  const [selected, setSelected] = useState(false);
  const isTripStart = type === 'tripStart';
  const isTripEnd = type === 'tripEnd';

  const handleSelection = () => {
    const { startIndex, endIndex } = selection;

    if (startIndex === null) setSelection({ ...selection, startIndex: i });
    else if (startIndex !== null && i === startIndex)
      setSelection({ startIndex: null, endIndex: null });
    else if (startIndex !== null && endIndex === null && i > startIndex)
      setSelection({ ...selection, endIndex: i });
    else setSelection({ startIndex: i, endIndex: null });
  };

  return (
    <li
      className={`${isTripStart ? 'trip-start' : ''} ${
        isTripEnd ? 'trip-end' : ''
      } ${selected ? 'selected' : ''} history-item`}
      onClick={() => {
        if (editMode) setEditedItem(data);
        else if (sendMode) {
          setSelected(!selected);
          handleSelection();
        }
      }}
      ref={ref}
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
});

export default HistoryItem;
