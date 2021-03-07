import React, { useContext, useEffect } from 'react';

import HistoryItem from '../history-item/history-item.component';

import { AppContext } from '../../hooks/useAppState';

import './history-list.styles.scss';

const HistoryList = () => {
  const {
    borders,
    setBorders,
    currentUser,
    sendMode,
    isSortedDesc,
    setIsSortedDesc,
  } = useContext(AppContext);

  useEffect(() => {
    if (sendMode && isSortedDesc) {
      setIsSortedDesc(false);
      setBorders([...currentUser.borders]);
    }
  }, [sendMode]);

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
