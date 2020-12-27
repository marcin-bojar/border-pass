import React, { useContext } from 'react';

import CountryOption from '../country-option/country-option.component';

import './country-select.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountrySelect = () => {
  const { countries, currentCountry } = useContext(AppContext);
  return (
    <div className="country-select">
      {currentCountry && (
        <h3 className="country-select__title">Do jakiego kraju wjeżdzasz?</h3>
      )}
      <div className="country-select__options">
        {countries.map(country => (
          <CountryOption key={country} name={country} />
        ))}
      </div>
      {/* <input type="text" placeholder="Wpisz inny kraj"></input> */}
    </div>
  );
};

export default CountrySelect;
