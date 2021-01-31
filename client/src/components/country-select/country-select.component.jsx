import React, { useContext } from 'react';
import axios from 'axios';

import { sortUsersBorders, getConfig } from '../../utils';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';

import { AppContext } from '../../hooks/useAppState';

import './country-select.styles.scss';

const CountrySelect = () => {
  const {
    currentUser,
    setCurrentUser,
    countries,
    currentCountry,
    showAll,
    setShowAll,
    borders,
    setBorders,
    isSortedDesc,
    isMakingApiCall,
    setIsMakingApiCall,
  } = useContext(AppContext);

  const undoLastEntry = () => {
    if (currentUser) {
      setIsMakingApiCall(true);
      const { _id } = currentUser;

      axios
        .delete(`/api/users/${_id}/borders/undo`, getConfig())
        .then(res => {
          const user = sortUsersBorders(res.data.data, isSortedDesc);
          setCurrentUser(user);
        })
        .catch(err => {
          alert(err.response.data.error);
        })
        .finally(() => setIsMakingApiCall(false));
    } else {
      isSortedDesc ? borders.shift() : borders.pop();
      setBorders([...borders]);
    }
  };

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
          disabled={borders.length === 0 || isMakingApiCall}
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
