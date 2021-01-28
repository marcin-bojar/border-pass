import React, { useContext } from 'react';
import axios from 'axios';

import {
  parseTimestamp,
  sortUsersBorders,
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
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name) {
        alert('Jesteś już w tym kraju.');
        return;
      }

      const timestamp = Date.now();
      const { time, date } = parseTimestamp(timestamp);

      const borderPass = {
        from: currentCountry,
        to: name,
        time,
        date,
        timestamp,
      };

      if (currentUser) {
        const { _id } = currentUser;

        axios
          .post(`/api/users/${_id}/borders`, borderPass, getConfig())
          .then(res => {
            const user = sortUsersBorders(res.data.data, isSortedDesc);
            setCurrentUser(user);
            return axios.post('/api/borders', { ...borderPass, user: _id });
          })
          .catch(err => alert('Ups... ' + err.response.data.error));
      } else {
        const updatedBorders = sortHistoryListByTimeAndDate(
          [...borders, borderPass],
          isSortedDesc,
          'timestamp'
        );
        setBorders(updatedBorders);
      }
    } else setCurrentCountry(name);
  };

  return (
    <button type="button" className="country-option" onClick={handleClick}>
      {name}
    </button>
  );
};

export default CountryOption;
