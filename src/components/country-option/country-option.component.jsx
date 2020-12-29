import React, { useContext } from 'react';

import { parseDate } from '../../utils';

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
  } = useContext(AppContext);

  const handleClick = () => {
    if (currentCountry) {
      if (currentCountry === name) {
        alert('Jesteś już w tym kraju.');
        return;
      }

      const timeAndDate = parseDate(Date.now());
      const { time, date } = timeAndDate;

      const borderPass = {
        from: currentCountry,
        to: name,
        time,
        date,
      };

      setBorders([...borders, borderPass]);
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
