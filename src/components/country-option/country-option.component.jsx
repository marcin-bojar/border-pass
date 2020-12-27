import React from 'react';

import './country-option.styles.scss';

const CountryOption = ({ name }) => (
  <div
    className="country-option"
    onClick={() => localStorage.setItem('currentCountry', name)}
  >
    {name}
  </div>
);

export default CountryOption;
