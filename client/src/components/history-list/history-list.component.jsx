import React, { useContext } from 'react';

import HistoryItem from '../history-item/history-item.component';

import { AppContext } from '../../hooks/useAppState';

import './history-list.styles.scss';

const HistoryList = () => {
  const { borders } = useContext(AppContext);

  return (
    <ul className="history-list">
      {borders.map((el, i) => {
        const data = { ...el, i };
        return <HistoryItem key={i} data={data} />;
      })}
    </ul>
  );
};

export default HistoryList;
