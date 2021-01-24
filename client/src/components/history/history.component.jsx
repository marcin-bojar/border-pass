import React, { useContext } from 'react';
import axios from 'axios';

import HistoryItem from '../history-item/history-item.component';
import CustomButton from '../custom-button/custom-button.component';
import HistoryEditor from '../history-editor/history-editor.component';
import Loader from '../loader/loader.component';

import { sortHistoryListByTimeAndDate } from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './history.styles.scss';

const History = () => {
  const {
    currentUser,
    setCurrentUser,
    borders,
    setBorders,
    editMode,
    setEditMode,
    isSortedDesc,
    setIsSortedDesc,
    isFetchingBorders,
  } = useContext(AppContext);

  const sortBordersByDate = () => {
    let sortedBorders;
    if (currentUser)
      sortedBorders = sortHistoryListByTimeAndDate(borders, !isSortedDesc);
    else
      sortedBorders = sortHistoryListByTimeAndDate(
        borders,
        !isSortedDesc,
        'timestamp'
      );
    setIsSortedDesc(!isSortedDesc);
    setBorders([...sortedBorders]);
  };

  const handleDeleteAll = () => {
    if (borders.length === 0) {
      alert('Brak zapisanych danych w historii.');
      return;
    }

    const confirm = prompt(
      "Spowoduje to NIEODWRACALNE usunięcie całej historii!\nWpisz 'TAK', aby usunąć."
    );
    if (confirm && confirm.toUpperCase() === 'TAK') {
      if (currentUser) {
        const { _id } = currentUser;
        axios
          .delete(`/api/users/${_id}/borders`)
          .then(res => setCurrentUser(res.data.data))
          .catch(err => alert('Ups... ' + err.message));
      } else {
        setBorders([]);
      }
    }
  };

  if (isFetchingBorders) return <Loader />;

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

        <CustomButton clear handleClick={handleDeleteAll}>
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
