import React, { useContext } from 'react';

import './country-option.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountryOption = ({ name }) => {
  const { setCurrentCountry } = useContext(AppContext);
  return (
    <div className="country-option" onClick={() => setCurrentCountry(name)}>
      {name}
    </div>
  );
};

export default CountryOption;
