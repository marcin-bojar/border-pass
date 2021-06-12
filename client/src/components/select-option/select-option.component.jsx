import React, { useContext } from 'react';
import axios from 'axios';

import { parseTimestamp, sortHistoryListByTimeAndDate, getConfig } from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './select-option.styles.scss';

const SelectOption = ({ name, placeOption }) => {
  const {
    userState: { currentUser },
    dataState: { historyList, isSortedDesc, currentCountry },
    generalState: { isMakingApiCall },
    setUserState,
    setDataState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name && !placeOption) {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: { type: 'error', text: 'Jesteś już w tym kraju.' },
        });
        return;
      }

      const timestamp = Date.now();
      const { time, date } = parseTimestamp(timestamp);

      const tripEvent = placeOption
        ? {
            type: 'place',
            to: currentCountry,
            name,
            time,
            date,
            timestamp,
          }
        : {
            type: 'borderPass',
            from: currentCountry,
            to: name,
            time,
            date,
            timestamp,
          };

      if (currentUser) {
        setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });
        const { _id } = currentUser;

        axios
          .post(`/api/users/${_id}/borders`, tripEvent, getConfig())
          .then(res => setUserState({ type: 'SET_USER', payload: res.data.data }))
          .catch(err => {
            setUiState({
              type: 'SET_MODAL_DATA',
              payload: {
                type: 'error',
                text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
              },
            });

            if (err?.response?.status === 401) {
              setUserState({
                type: 'USER_AUTH_ERROR',
                payload: err.response.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
              });
            }
          })
          .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
      } else {
        const updatedHistoryList = sortHistoryListByTimeAndDate(
          [...historyList, tripEvent],
          !isSortedDesc,
          'timestamp'
        );
        setDataState({ type: 'SET_HISTORY_LIST', payload: updatedHistoryList });
      }
    } else setDataState({ type: 'SET_CURRENT_COUNTRY', payload: name });
  };

  return (
    <button
      type="button"
      className={`${placeOption ? 'place' : ''} select-option`}
      onClick={handleClick}
      disabled={isMakingApiCall}
    >
      {name}
    </button>
  );
};

export default SelectOption;
