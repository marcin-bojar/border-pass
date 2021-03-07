import React, { useContext } from 'react';
import axios from 'axios';

import HistoryList from '../history-list/history-list.component';
import CustomButton from '../custom-button/custom-button.component';
import HistoryEditor from '../history-editor/history-editor.component';

import { sortHistoryListByTimeAndDate, getConfig } from '../../utils';

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
    setModalData,
  } = useContext(AppContext);

  const sortBordersByDate = () => {
    let sortedBorders;
    if (currentUser)
      sortedBorders = sortHistoryListByTimeAndDate(borders, isSortedDesc);
    else
      sortedBorders = sortHistoryListByTimeAndDate(
        borders,
        isSortedDesc,
        'timestamp'
      );
    setIsSortedDesc(!isSortedDesc);
    setBorders([...sortedBorders]);
  };

  const handleDeleteAll = () => {
    if (currentUser) {
      const { _id } = currentUser;
      axios
        .delete(`/api/users/${_id}/borders`, getConfig())
        .then(res => setCurrentUser(res.data.data))
        .catch(err =>
          setModalData({ type: 'error', text: err.response.data.error })
        );
    } else {
      setBorders([]);
    }
  };

  if (borders.length === 0) return null;

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
          handleClick={() =>
            setModalData({
              type: 'prompt',
              text:
                "Spowoduje to NIEODWRACALNE usunięcie całej historii.\nWpisz 'TAK', aby usunąć.",
              expectedValue: 'TAK',
              onConfirm: handleDeleteAll,
            })
          }
        >
          Wyczyść
        </CustomButton>
      </div>

      {editMode && <HistoryEditor />}

      <HistoryList />
    </div>
  );
};

export default History;
