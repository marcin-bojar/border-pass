import React, { useContext } from 'react';

import HistoryItem from '../history-item/history-item.component';
import CustomButton from '../custom-button/custom-button.component';
import HistoryEditor from '../history-editor/history-editor.component';
import Loader from '../loader/loader.component';

import { sortHistoryListByTimeAndDate } from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './history.styles.scss';

const History = () => {
  const {
    borders,
    setBorders,
    editMode,
    setEditMode,
    isSortedDesc,
    setIsSortedDesc,
    isFetchingBorders,
  } = useContext(AppContext);

  const sortBordersByDate = () => {
    const order = isSortedDesc ? 'asc' : 'desc';
    let sortedBorders;
    sortedBorders = sortHistoryListByTimeAndDate(borders, order);
    setIsSortedDesc(!isSortedDesc);
    setBorders([...sortedBorders]);
  };

  if (isFetchingBorders)
    return (
      <div className="history">
        <Loader />
      </div>
    );

  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>

      <div className="history__button-wrapper">
        <CustomButton handleClick={() => setEditMode(!editMode)}>
          {editMode ? 'Zamknij' : 'Edytuj'}
        </CustomButton>

        <div className="history__button-wrapper sort">
          <CustomButton inline handleClick={sortBordersByDate}>
            Sortuj wg daty
          </CustomButton>
          <p className="history__sort-status">
            {isSortedDesc ? 'od najnowszej' : 'od najstarszej'}
          </p>
        </div>

        <CustomButton
          clear
          handleClick={() => {
            const confirm = prompt(
              "Spowoduje to usunięcie całej historii!\nWpisz 'TAK', aby usunąć."
            );
            if (confirm && confirm.toUpperCase() === 'TAK') setBorders([]);
          }}
        >
          Wyczyść
        </CustomButton>
      </div>

      {editMode && <HistoryEditor />}

      <ul className="history__list">
        {borders.map((el, i) => {
          const data = { ...el, i };
          return <HistoryItem key={i} data={data} />;
        })}
      </ul>
    </div>
  );
};

export default History;
