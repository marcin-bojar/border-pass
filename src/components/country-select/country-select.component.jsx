import React, { useContext } from 'react';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';

import './country-select.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CountrySelect = () => {
  const {
    countries,
    currentCountry,
    setCurrentCountry,
    showAll,
    setShowAll,
    borders,
    setBorders,
  } = useContext(AppContext);

  const clearLastEntry = () => {
    let startCountry;

    // Before removing last item from the list save the country's value where trip began
    if (borders.length === 1) startCountry = borders[0].from;
    borders.pop();

    startCountry
      ? setCurrentCountry(startCountry)
      : setCurrentCountry(borders[borders.length - 1].to);
    setBorders([...borders]);
  };

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
        <CustomButton
          disabled={countries.length <= 10}
          handleClick={() => setShowAll(!showAll)}
        >
          {!showAll ? 'Więcej' : 'Ukryj'}
        </CustomButton>

        <CustomButton
          clear
          disabled={borders.length === 0}
          handleClick={clearLastEntry}
        >
          Cofnij
        </CustomButton>
      </div>

      <AddCountry />
    </div>
  );
};

export default CountrySelect;
