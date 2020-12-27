import React from 'react';

import './current-country.styles.scss';

const CurrentCountry = ({ country }) => (
  <div className="current-country">
    <p>{country}</p>
  </div>
);

export default CurrentCountry;
