import React, { useContext } from 'react';
import axios from 'axios';

import {
  parseTimestamp,
  sortHistoryListByTimeAndDate,
  getConfig,
} from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './country-option.styles.scss';

const CountryOption = ({ name }) => {
  const {
    currentUser,
    setCurrentUser,
    currentCountry,
    setCurrentCountry,
    borders,
    setBorders,
    isSortedDesc,
    isMakingApiCall,
    setIsMakingApiCall,
    setModalData,
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name) {
        setModalData({ type: 'error', text: 'Jesteś już w tym kraju.' });
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
            setCurrentUser(res.data.data);
            return axios.post('/api/borders', { ...borderPass, user: _id });
          })
          .catch(err =>
            setModalData({ type: 'error', text: err.response.data.error })
          )
          .finally(() => setIsMakingApiCall(false));
      } else {
        const updatedBorders = sortHistoryListByTimeAndDate(
          [...borders, borderPass],
          !isSortedDesc,
          'timestamp'
        );
        setBorders(updatedBorders);
      }
    } else setCurrentCountry(name);
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
