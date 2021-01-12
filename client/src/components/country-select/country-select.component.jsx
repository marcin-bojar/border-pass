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
    showAll,
    setShowAll,
    borders,
    setBorders,
    isFetchingCountries,
    disableUndoButton,
    setDisableUndoButton,
  } = useContext(AppContext);

  const undoLastEntry = () => {
    setDisableUndoButton(true);
    axios
      .delete('/api/borders/undo')
      .then(res => {
        const undoBorders = borders.filter(b => b._id !== res.data.data._id);
        setBorders(undoBorders);
        setDisableUndoButton(false);
      })
      .catch(err => alert('Ups... ' + err.message));
  };

  if (isFetchingCountries) return <Loader />;

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
          disabled={borders.length === 0 || disableUndoButton}
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
