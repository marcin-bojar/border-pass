import React, { useContext } from 'react';

import { parseDate, sortDESC } from '../../utils';

import './country-option.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountryOption = ({ name }) => {
  const {
    currentCountry,
    setCurrentCountry,
    borders,
    setBorders,
    countries,
    setCountries,
    isSortedDesc,
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name) {
        alert('Jesteś już w tym kraju.');
        return;
      }

      const timestamp = Date.now();
      const { time, date } = parseDate(timestamp);

      const borderPass = {
        from: currentCountry,
        to: name,
        time,
        date,
        timestamp,
      };

      const updatedBorders = isSortedDesc
        ? sortDESC([...borders, borderPass])
        : [...borders, borderPass];

      setBorders(updatedBorders);
    }
    setCurrentCountry(name);

    // Put selected country in the beginning of the list
    const filteredCountries = countries.filter(el => el !== name);
    filteredCountries.unshift(name);
    setCountries([...filteredCountries]);
  };

  return (
    <button type="button" className="country-option" onClick={handleClick}>
      {name}
    </button>
  );
};

export default CountryOption;
