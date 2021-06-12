import React, { useContext, useState } from 'react';
import axios from 'axios';

import { getConfig } from '../../utils';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';

import { AppContext } from '../../hooks/useAppState';

import './country-select.styles.scss';

const CountrySelect = () => {
  const {
    userState: { currentUser },
    dataState: { countries, currentCountry, historyList, isSortedDesc },
    generalState: { isMakingApiCall },
    setUserState,
    setDataState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);

  const [showAll, setShowAll] = useState(false);

  const undoLastEntry = () => {
    if (currentUser) {
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

      const { _id } = currentUser;
      const lastItemId = isSortedDesc
        ? historyList[0]._id
        : historyList[historyList.length - 1]._id;

      axios
        .delete(`/api/users/${_id}/borders/undo`, {
          ...getConfig(),
          data: { lastItemId },
        })
        .then(res => {
          setUserState({ type: 'SET_USER', payload: res.data.data });
        })
        .catch(err => {
          setUiState({
            type: 'SET_MODAL_DATA',
            payload: {
              type: 'error',
              text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
            },
          });
        })
        .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
    } else {
      isSortedDesc ? historyList.shift() : historyList.pop();
      setDataState({ type: 'SET_HISTORY_LIST', payload: [...historyList] });
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
        <CustomButton
          setWidth="8.4rem"
          disabled={countries.length <= 10}
          handleClick={() => setShowAll(!showAll)}
        >
          {!showAll ? 'Więcej' : 'Ukryj'}
        </CustomButton>

        <CustomButton
          setWidth="8.4rem"
          clear
          disabled={historyList.length === 0 || isMakingApiCall}
          handleClick={() =>
            setUiState({
              type: 'SET_MODAL_DATA',
              payload: {
                type: 'confirm',
                text: 'Usuwasz ostatni wpis z listy. Czy chcesz kontynuować?',
                onConfirm: undoLastEntry,
              },
            })
          }
        >
          Cofnij
        </CustomButton>
      </div>

      <AddCountry label="Dodaj kraj" />
    </div>
  );
};

export default CountrySelect;
