import React, { useContext } from 'react';
import axios from 'axios';

import { parseTimestamp, sortHistoryListByTimeAndDate } from '../../utils';

import { AppContext } from '../../hooks/useAppState';

import './country-option.styles.scss';

const CountryOption = ({ name }) => {
  const {
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

      axios
        .post('/api/borders', borderPass)
        .then(res => {
          let updatedBorders = [...borders, res.data.data];

          if (isSortedDesc)
            updatedBorders = sortHistoryListByTimeAndDate(
              updatedBorders,
              isSortedDesc
            );
          setBorders(updatedBorders);
        })
        .catch(err => alert('Ups... ' + err.message));
    }
    setCurrentCountry(name);
  };

  return (
    <button type="button" className="country-option" onClick={handleClick}>
      {name}
    </button>
  );
};

export default CountryOption;
