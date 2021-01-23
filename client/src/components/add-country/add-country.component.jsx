import React, { useState, useContext } from 'react';
import axios from 'axios';

import CustomInput from '../custom-input/custom-input.component';

import useSingleInput from '../../hooks/useSingleInput';
import { AppContext } from '../../hooks/useAppState';

import './add-country.styles.scss';

const AddCountry = () => {
  const { inputValue, setInputValue, handleChange } = useSingleInput();
  const { countries, setCountries, currentUser } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const name = inputValue.toUpperCase();
    if (!name) return;

    setIsAdding(true);
    const newCountry = { name };

    if (currentUser) {
      const { _id } = currentUser;

      axios
        .post(`/api/users/${_id}/countries`, newCountry)
        .then(res => {
          if (res.data.success) {
            setCountries([...res.data.data.countries]);
            setInputValue('');
            setIsAdding(false);
          } else {
            alert(res.data.error);
            setIsAdding(false);
          }
        })
        .catch(err => alert('Ups... ' + err));
    } else {
      const countryExists = countries.find(el => el.name === name);

      if (countryExists) {
        alert('Ten kraj jest już na liście.');
        setIsAdding(false);
      } else {
        setCountries([...countries, { name }]);
        setInputValue('');
        setIsAdding(false);
      }
    }
  };

  return (
    <div className="add-country">
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={inputValue}
          handleChange={handleChange}
          maxLength="3"
          disabled={isAdding}
          label="Dodaj kraj"
        />
      </form>
    </div>
  );
};

export default AddCountry;
