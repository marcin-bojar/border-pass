import React, { useContext } from 'react';
import axios from 'axios';

import { parseTimestamp, sortHistoryListByTimeAndDate, getConfig } from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './country-option.styles.scss';

const CountryOption = ({ name }) => {
  const {
    userState: { currentUser },
    dataState: { historyList, isSortedDesc, currentCountry },
    setUserState,
    setDataState,
    setUiState,
    isMakingApiCall,
    setIsMakingApiCall,
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name) {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: { type: 'error', text: 'Jesteś już w tym kraju.' },
        });
        return;
      }

      const timestamp = Date.now();
      const { time, date } = parseTimestamp(timestamp);

      const borderPass = {
        type: 'borderPass',
        from: currentCountry,
        to: name,
        time,
        date,
        timestamp,
      };

      if (currentUser) {
        setIsMakingApiCall(true);
        const { _id } = currentUser;

        axios
          .post(`/api/users/${_id}/borders`, borderPass, getConfig())
          .then(res => {
            setUserState({ type: 'SET_USER', payload: res.data.data });
            return axios.post('/api/borders', { ...borderPass, user: _id });
          })
          .catch(err =>
            setUiState({
              type: 'SET_MODAL_DATA',
              payload: {
                type: 'error',
                text: err?.response?.data.error || 'Coś poszło nie tak spróbuj ponownie.',
              },
            })
          )
          .finally(() => setIsMakingApiCall(false));
      } else {
        const updatedHistoryList = sortHistoryListByTimeAndDate(
          [...historyList, borderPass],
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
      className="country-option"
      onClick={handleClick}
      disabled={isMakingApiCall}
    >
      {name}
    </button>
  );
};

export default CountryOption;
