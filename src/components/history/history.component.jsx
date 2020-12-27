import React, { useContext } from 'react';

import { parseDate } from '../../utils';

import HistoryItem from '../history-item/history-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './history.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const History = () => {
  const { borders, setBorders } = useContext(AppContext);
  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>
      <div className="history__button-wrapper">
        <CustomButton handleClick={() => setBorders([])} clear>
          Wyczyść
        </CustomButton>
      </div>
      <ul className="history__list">
        {borders.map((el, i) => {
          const { from, to, timestamp } = el;
          const timeAndDate = parseDate(timestamp);
          const data = { from, to, timeAndDate };
          return <HistoryItem key={i} data={data} />;
        })}
      </ul>
    </div>
  );
};

export default History;
