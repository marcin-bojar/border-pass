import React, { useContext } from 'react';

import './country-option.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountryOption = ({ name }) => {
  const { currentCountry, setCurrentCountry, borders, setBorders } = useContext(
    AppContext
  );

  const handleClick = () => {
    if (currentCountry) {
      const borderPass = {
        from: currentCountry,
        to: name,
        timestamp: new Date(),
      };
      setBorders([...borders, borderPass]);
    }
    setCurrentCountry(name);
  };

  return (
    <div className="country-option" onClick={handleClick}>
      {name}
    </div>
  );
};

export default CountryOption;
