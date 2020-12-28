import React, { useContext } from 'react';

import CountryOption from '../country-option/country-option.component';
import CustomInput from '../custom-input/custom-input.component';

import './country-select.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountrySelect = () => {
  const { countries, currentCountry } = useContext(AppContext);
  return (
    <div className="country-select">
      {currentCountry && (
        <h3 className="country-select__title">Do jakiego kraju wjeżdżasz?</h3>
      )}
      <div className="country-select__options">
        {countries.map(country => (
          <CountryOption key={country} name={country} />
        ))}
      </div>
      <div className="country-select__input-wrapper">
        <CustomInput maxLength="3" label="Dodaj kraj" />
      </div>
    </div>
  );
};

export default CountrySelect;
