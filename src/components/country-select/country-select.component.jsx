import React, { useContext } from 'react';

import CountryOption from '../country-option/country-option.component';
import CustomInput from '../custom-input/custom-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './country-select.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountrySelect = () => {
  const { countries, currentCountry, showAll, setShowAll } = useContext(
    AppContext
  );
  return (
    <div className="country-select">
      {currentCountry && (
        <h3 className="country-select__title">Do jakiego kraju wjeżdżasz?</h3>
      )}

      <div className="country-select__options">
        {showAll
          ? countries.map(country => (
              <CountryOption key={country} name={country} />
            ))
          : countries
              .filter((_, i) => i < 10)
              .map(country => <CountryOption key={country} name={country} />)}
      </div>

      <div className="country-select__button-wrapper">
        <CustomButton handleClick={() => setShowAll(!showAll)}>
          {!showAll ? 'Więcej' : 'Ukryj'}
        </CustomButton>
      </div>

      <div className="country-select__input-wrapper">
        <CustomInput maxLength="3" label="Dodaj kraj" />
      </div>
    </div>
  );
};

export default CountrySelect;
