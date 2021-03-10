import React, { useContext, useEffect, createRef } from 'react';

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
    selection,
  } = useContext(AppContext);

  const itemRefsArray = [];

  useEffect(() => {
    if (sendMode && isSortedDesc) {
      setIsSortedDesc(false);
      setBorders([...currentUser.borders]);
    }
  }, [sendMode]);

  useEffect(() => {
    const { startIndex, endIndex } = selection;
    if (startIndex !== null && endIndex !== null) {
      for (let i = startIndex; i <= endIndex; i++) {
        itemRefsArray[i].current.classList.add('selected');
      }
    } else if (startIndex !== null && endIndex === null) {
      for (let i = 0; i <= itemRefsArray.length - 1; i++) {
        itemRefsArray[i].current.classList.remove('selected');
      }
      itemRefsArray[startIndex].current.classList.add('selected');
    } else if (startIndex === null && endIndex === null)
      for (let i = 0; i <= itemRefsArray.length - 1; i++) {
        itemRefsArray[i].current.classList.remove('selected');
      }
  }, [selection]);

  return (
    <ul className="history-list">
      {borders.map((el, i) => {
        const itemRef = createRef();
        itemRefsArray.push(itemRef);
        const data = { ...el, i };
        return <HistoryItem ref={itemRef} key={i} data={data} />;
      })}
    </ul>
  );
};

export default HistoryList;
