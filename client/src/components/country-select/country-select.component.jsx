import React, { useContext } from 'react';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';
import Loader from '../spinner/loader.component/';

import { AppContext } from '../../hooks/useAppState';

import './country-select.styles.scss';

const CountrySelect = () => {
  const {
    countries,
    currentCountry,
    setCurrentCountry,
    showAll,
    setShowAll,
    borders,
    setBorders,
    isSortedDesc,
    isFetchingCountries,
  } = useContext(AppContext);

  const clearLastEntry = () => {
    let startCountry;

    const clearLastAsc = () => {
      borders.pop();
      setCurrentCountry(borders[borders.length - 1].to);
      setBorders([...borders]);
    };

    const clearLastDesc = () => {
      borders.shift();
      setCurrentCountry(borders[0].to);
      setBorders([...borders]);
    };

    if (borders.length === 1) {
      // Before removing last item from the list save the country's value where trip began
      startCountry = borders[0].from;

      borders.pop();
      setCurrentCountry(startCountry);
      setBorders([...borders]);
    } else {
      isSortedDesc ? clearLastDesc() : clearLastAsc();
    }
  };

  if (isFetchingCountries)
    return (
      <div className="country-select">
        <Loader />
      </div>
    );

  return (
    <div className="country-select">
      {currentCountry && (
        <h3 className="country-select__title">Do jakiego kraju wjeżdżasz?</h3>
      )}

      <div className="country-select__options">
        {showAll
          ? countries.map(country => (
              <CountryOption key={country.name} name={country.name} />
            ))
          : countries
              .filter((_, i) => i < 10)
              .map(country => (
                <CountryOption key={country.name} name={country.name} />
              ))}
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
