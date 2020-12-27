import React, { useContext } from 'react';

import { parseDate } from '../../utils';

import HistoryItem from '../history-item/history-item.component';

import './history.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const History = () => {
  const { borders } = useContext(AppContext);
  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>
      <ul className="history__list">
        {borders.map(el => {
          const { from, to, timestamp } = el;
          const timeAndDate = parseDate(timestamp);
          const data = { from, to, timeAndDate };
          return <HistoryItem data={data} />;
        })}
      </ul>
    </div>
  );
};

export default History;
