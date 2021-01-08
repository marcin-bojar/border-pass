import React, { useContext } from 'react';
import axios from 'axios';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';
import Loader from '../loader/loader.component/';

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
    isFetchingCountries,
  } = useContext(AppContext);

  const undoLastEntry = () => {
    axios
      .delete('/api/borders/undo')
      .then(res => {
        const undoBorders = borders.filter(
          border => border._id !== res.data.data._id
        );
        const undoCurrentCountry = res.data.data.from;
        setBorders(undoBorders);
        setCurrentCountry(undoCurrentCountry);
      })
      .catch(err =>
        res.status(400).json({ success: false, error: err.message })
      );
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
          handleClick={undoLastEntry}
        >
          Cofnij
        </CustomButton>
      </div>

      <AddCountry />
    </div>
  );
};

export default CountrySelect;
