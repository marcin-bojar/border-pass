import React, { useContext, useState } from 'react';
import axios from 'axios';

import { getConfig } from '../../utils';

import CountryOption from '../country-option/country-option.component';
import CustomButton from '../custom-button/custom-button.component';
import AddCountry from '../add-country/add-country.component';

import { AppContext } from '../../hooks/useAppState';

import './select.styles.scss';

const Select = ({ placesSelect }) => {
  const {
    userState: { currentUser },
    dataState: { countries, places, currentCountry, historyList, isSortedDesc },
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

  const commonMarkup = (
    <>
      <div className="select__button-wrapper">
        <CustomButton
          setWidth="8.4rem"
          disabled={placesSelect ? places.length < 6 : countries.length <= 10}
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
                text: 'Usuwasz ostatni wpis z Historii Podróży. Czy chcesz kontynuować?',
                onConfirm: undoLastEntry,
              },
            })
          }
        >
          Cofnij
        </CustomButton>
      </div>{' '}
    </>
  );

  const countryMarkup = (
    <>
      {' '}
      <div className="select">
        {currentCountry && <h3 className="select__title">Do jakiego kraju wjeżdżasz?</h3>}

        <div className="select__options">
          {showAll
            ? countries.map(country => <CountryOption key={country.name} name={country.name} />)
            : countries
                .filter((_, i) => i < 10)
                .map(country => <CountryOption key={country.name} name={country.name} />)}
        </div>

        {commonMarkup}

        <AddCountry label="Dodaj kraj" />
      </div>{' '}
    </>
  );

  const placesMarkup = (
    <>
      {' '}
      <div className="select">
        <h3 className="select__title">Punkty podróży</h3>
        <div className="select__options select__options--places">
          {places.length ? (
            showAll ? (
              places.map(place => <CountryOption place key={place.name} name={place.name} />)
            ) : (
              places
                .filter((_, i) => i < 6)
                .map(place => <CountryOption place key={place.name} name={place.name} />)
            )
          ) : (
            <div className="select__info">
              <p className="select__text">
                Jeśli musisz rejestrować również punkty pośrednie swojej podróży służbowej, takie
                jak miasta, firmy, przystanki itp, tutaj możesz je dodawać.
              </p>
              <p className="select__text">
                Jeśli nie musisz tego robić, możesz ukryć ten element w swoich ustawieniach.
              </p>
            </div>
          )}
        </div>

        {commonMarkup}

        <AddCountry place label="Dodaj punkt" />
      </div>{' '}
    </>
  );

  return placesSelect ? placesMarkup : countryMarkup;
};

export default Select;