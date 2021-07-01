import React, { useContext } from 'react';
import axios from 'axios';

import CustomInput from '../custom-input/custom-input.component';
import Spinner from '../spinner/spinner.component';

import { getConfig } from '../../utils';
import { AppContext } from '../../hooks/useAppState';
import useSingleInput from '../../hooks/useSingleInput';

import './add-option.styles.scss';

const AddOption = ({ label, place }) => {
  const { inputValue, setInputValue, handleChange } = useSingleInput();
  const {
    userState: { currentUser },
    dataState: { countries, places },
    generalState: { isMakingApiCall },
    setDataState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();

    const name = inputValue.toUpperCase();
    if (!name) return;

    setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });
    const newOption = { name };

    if (currentUser) {
      const { _id } = currentUser;
      const url = place ? `/api/users/${_id}/places` : `/api/users/${_id}/countries`;

      axios
        .post(url, newOption, getConfig())
        .then(res => {
          if (res.data.success) {
            const type = place ? 'SET_PLACES' : 'SET_COUNTRIES';
            const payload = place ? [...res.data.data.places] : [...res.data.data.countries];
            setDataState({ type, payload });
            setInputValue('');
          } else {
            setUiState({
              type: 'SET_MODAL_DATA',
              payload: { type: 'error', text: res.data.error },
            });
          }
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
      const optionExists = place
        ? places.find(el => el.name === name)
        : countries.find(el => el.name === name);

      if (optionExists) {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'error',
            text: places ? 'Ten punkt jest już na liście.' : 'Ten kraj jest już na liście.',
          },
        });
      } else {
        const type = place ? 'SET_PLACES' : 'SET_COUNTRIES';
        const payload = place ? [...places, { name }] : [...countries, { name }];
        setDataState({ type, payload });
        setInputValue('');
      }
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false });
    }
  };

  return (
    <div className="add-option">
      <form className="add-option__form" onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={inputValue}
          handleChange={handleChange}
          maxLength={place ? '15' : '3'}
          disabled={isMakingApiCall}
          label={label}
          aria-label={label}
          data-test={place ? 'add-place' : 'add-country'}
        />
      </form>
      <div className="add-option__spinner-wrapper">
        <Spinner isLoading={isMakingApiCall} />
      </div>
    </div>
  );
};

export default AddOption;
