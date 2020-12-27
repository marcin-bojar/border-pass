import React from 'react';

import CountryOption from '../country-option/country-option.component';

import './country-select.styles.scss';

const CountrySelect = ({ countries }) => (
  <div className="country-select">
    <div className="country-select__options">
      {countries.map(country => (
        <CountryOption key={country} name={country} />
      ))}
    </div>
    {/* <input type="text" placeholder="Wpisz inny kraj"></input> */}
  </div>
);

export default CountrySelect;
