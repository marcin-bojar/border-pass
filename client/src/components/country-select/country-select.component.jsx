import React, { useContext } from 'react';
import axios from 'axios';

import { getConfig } from '../../utils';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';

import { AppContext } from '../../hooks/useAppState';

import './country-select.styles.scss';

const CountrySelect = () => {
  const {
    userData: { currentUser },
    setUserData,
    countries,
    currentCountry,
    showAll,
    setShowAll,
    borders,
    setBorders,
    isSortedDesc,
    isMakingApiCall,
    setIsMakingApiCall,
    setModalData,
  } = useContext(AppContext);

  const undoLastEntry = () => {
    if (currentUser) {
      setIsMakingApiCall(true);
      const { _id } = currentUser;
      const lastItemId = isSortedDesc ? borders[0]._id : borders[borders.length - 1]._id;

      axios
        .delete(`/api/users/${_id}/borders/undo`, {
          ...getConfig(),
          data: { lastItemId },
        })
        .then(res => {
          setUserData({ type: 'SET_USER', payload: res.data.data });
        })
        .catch(err => {
          setModalData({
            type: 'error',
            text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
          });
        })
        .finally(() => setIsMakingApiCall(false));
    } else {
      isSortedDesc ? borders.shift() : borders.pop();
      setBorders([...borders]);
    }
  };

  return (
    <div className="country-select">
      {currentCountry && <h3 className="country-select__title">Do jakiego kraju wjeżdżasz?</h3>}

      <div className="country-select__options">
        {showAll
          ? countries.map(country => <CountryOption key={country.name} name={country.name} />)
          : countries
              .filter((_, i) => i < 10)
              .map(country => <CountryOption key={country.name} name={country.name} />)}
      </div>

      <div className="country-select__button-wrapper">
        <CustomButton disabled={countries.length <= 10} handleClick={() => setShowAll(!showAll)}>
          {!showAll ? 'Więcej' : 'Ukryj'}
        </CustomButton>

        <CustomButton
          clear
          disabled={borders.length === 0 || isMakingApiCall}
          handleClick={() =>
            setModalData({
              type: 'confirm',
              text: 'Usuwasz ostatni wpis z listy. Czy chcesz kontynuować?',
              onConfirm: undoLastEntry,
            })
          }
        >
          Cofnij
        </CustomButton>
      </div>

      <AddCountry />
    </div>
  );
};

export default CountrySelect;
