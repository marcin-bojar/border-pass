import React, { useContext } from 'react';

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

      const borderPass = {
        from: currentCountry,
        to: name,
        timestamp: Date.now(),
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
