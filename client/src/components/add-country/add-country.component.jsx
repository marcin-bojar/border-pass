import React, { useState, useContext } from 'react';
import axios from 'axios';

import CustomInput from '../custom-input/custom-input.component';
import Spinner from '../spinner/spinner.component';

import { getConfig } from '../../utils';
import useSingleInput from '../../hooks/useSingleInput';
import { AppContext } from '../../hooks/useAppState';

import './add-country.styles.scss';

const AddCountry = () => {
  const { inputValue, setInputValue, handleChange } = useSingleInput();
  const {
    userState: { currentUser },
    dataState: { countries },
    setDataState,
    setModalData,
    isMakingApiCall,
    setIsMakingApiCall,
  } = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();

    const name = inputValue.toUpperCase();
    if (!name) return;

    setIsMakingApiCall(true);
    const newCountry = { name };

    if (currentUser) {
      const { _id } = currentUser;

      axios
        .post(`/api/users/${_id}/countries`, newCountry, getConfig())
        .then(res => {
          if (res.data.success) {
            setDataState({ type: 'SET_COUNTRIES', payload: [...res.data.data.countries] });
            setInputValue('');
          } else {
            setModalData({ type: 'error', text: res.data.error });
          }
        })
        .catch(err => {
          setModalData({ type: 'error', text: err.response.data.error });
        })
        .finally(() => setIsMakingApiCall(false));
    } else {
      const countryExists = countries.find(el => el.name === name);

      if (countryExists) {
        setModalData({ type: 'error', text: 'Ten kraj jest już na liście.' });
        setIsMakingApiCall(false);
      } else {
        setDataState({ type: 'SET_COUNTRIES', payload: [...countries, { name }] });
        setInputValue('');
        setIsMakingApiCall(false);
      }
    }
  };

  return (
    <div className="add-country">
      <form className="add-country__form" onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={inputValue}
          handleChange={handleChange}
          maxLength="3"
          disabled={isMakingApiCall}
          label="Dodaj kraj"
        />
      </form>
      <div className="add-country__spinner-wrapper">
        <Spinner isLoading={isMakingApiCall} />
      </div>
    </div>
  );
};

export default AddCountry;
