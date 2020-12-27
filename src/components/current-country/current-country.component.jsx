import React, { useContext } from 'react';

import './current-country.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CurrentCountry = () => {
  const { currentCountry } = useContext(AppContext);
  return (
    <div className="current-country">
      <h2 className="current-country__title">Obecnie znajdujesz się w: </h2>
      <span className="current-country__country">{currentCountry}</span>
    </div>
  );
};

export default CurrentCountry;
