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
    userState: { currentUser },
    dataState: { historyList, isSortedDesc },
    setUserState,
    setDataState,
    editMode,
    setEditMode,
    setModalData,
  } = useContext(AppContext);

  const reverseHistoryList = () => {
    let sortedHistoryList;
    if (currentUser) sortedHistoryList = sortHistoryListByTimeAndDate(historyList, isSortedDesc);
    else sortedHistoryList = sortHistoryListByTimeAndDate(historyList, isSortedDesc, 'timestamp');

    setDataState({ type: 'REVERSE_HISTORY_LIST', payload: [...sortedHistoryList] });
  };

  const handleDeleteAll = () => {
    if (currentUser) {
      const { _id } = currentUser;
      axios
        .delete(`/api/users/${_id}/borders`, getConfig())
        .then(res => setUserState({ type: 'SET_USER', payload: res.data.data }))
        .catch(err => setModalData({ type: 'error', text: err.response.data.error }));
    } else {
      setDataState({ type: 'SET_HISTORY_LIST', payload: [] });
    }
  };

  if (historyList.length === 0) return null;

  return (
    <div className="history">
      <h3 className="history__title">Historia przekroczeń granic:</h3>

      <div className="history__button-wrapper">
        <CustomButton handleClick={() => setEditMode(!editMode)}>
          {editMode ? 'Zamknij' : 'Edytuj'}
        </CustomButton>

        <div className="history__button-wrapper sort">
          <CustomButton inline handleClick={reverseHistoryList}>
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
