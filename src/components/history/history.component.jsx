import React, { useContext } from 'react';

import { parseDate } from '../../utils';

import HistoryItem from '../history-item/history-item.component';
import CustomButton from '../custom-button/custom-button.component';
import HistoryEditor from '../history-editor/history-editor.component';

import './history.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const History = () => {
  const { borders, setBorders, editMode, setEditMode } = useContext(AppContext);

  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>

      <div className="history__button-wrapper">
        <CustomButton handleClick={() => setEditMode(!editMode)}>
          {editMode ? 'Zamknij' : 'Edytuj'}
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
          const { from, to, timestamp } = el;
          const timeAndDate = parseDate(timestamp);
          const data = { from, to, timeAndDate, i };
          return <HistoryItem key={i} data={data} />;
        })}
      </ul>
    </div>
  );
};

export default History;
