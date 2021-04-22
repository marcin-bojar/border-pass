import React, { useContext, useEffect, createRef, useState } from 'react';

import HistoryItem from '../history-item/history-item.component';

import { AppContext } from '../../hooks/useAppState';

import './history-list.styles.scss';

const HistoryList = ({ list }) => {
  const {
    userState: { currentUser },
    dataState: { historyList, isSortedDesc, selection },
    generalState: { sendMode },
    setDataState,
  } = useContext(AppContext);
  const [listToDisplay, setListToDisplay] = useState(list || historyList);

  const itemRefsArray = [];

  useEffect(() => {
    if (!list) setListToDisplay(historyList);
  }, [historyList]);

  useEffect(() => {
    if (currentUser && sendMode && isSortedDesc) {
      setDataState({ type: 'SEND_MODE_ON' });

      return () => setDataState({ type: 'SEND_MODE_OFF' });
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
      {listToDisplay.map((el, i) => {
        const itemRef = createRef();
        itemRefsArray.push(itemRef);
        const data = { ...el, i };
        return <HistoryItem ref={itemRef} key={i} data={data} />;
      })}
    </ul>
  );
};

export default HistoryList;
