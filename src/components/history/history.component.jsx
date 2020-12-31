import React, { useContext } from 'react';

import HistoryItem from '../history-item/history-item.component';
import CustomButton from '../custom-button/custom-button.component';
import HistoryEditor from '../history-editor/history-editor.component';

import { sortASC, sortDESC } from '../../utils';

import './history.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const History = () => {
  const {
    borders,
    setBorders,
    editMode,
    setEditMode,
    isSortedDesc,
    setIsSortedDesc,
  } = useContext(AppContext);

  const sortBordersByDate = () => {
    let sortedBorders;
    if (isSortedDesc) sortedBorders = sortASC(borders);
    else sortedBorders = sortDESC(borders);
    setIsSortedDesc(!isSortedDesc);
    setBorders([...sortedBorders]);
  };

  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>

      <div className="history__button-wrapper">
        <CustomButton handleClick={() => setEditMode(!editMode)}>
          {editMode ? 'Zamknij' : 'Edytuj'}
        </CustomButton>

        <CustomButton inline handleClick={sortBordersByDate}>
          Sortuj wg daty
        </CustomButton>

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
