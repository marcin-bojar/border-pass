import React, { useState, useContext } from 'react';
import axios from 'axios';

import CustomInput from '../custom-input/custom-input.component';

import useSingleInput from '../../hooks/useSingleInput';
import { AppContext } from '../../hooks/useAppState';

import './add-country.styles.scss';

const AddCountry = () => {
  const { inputValue, setInputValue, handleChange } = useSingleInput();
  const { countries, setCountries } = useContext(AppContext);
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const name = inputValue.toUpperCase();
    if (!name) return;

    setIsAdding(true);
    const newCountry = { name };

    axios
      .post('http://localhost:5000/api/countries', newCountry)
      .then(res => {
        if (res.data.success) {
          setCountries([...countries, res.data.data]);
          setInputValue('');
          setIsAdding(false);
        } else {
          alert(res.data.error);
          setIsAdding(false);
        }
      })
      .catch(err => alert('Ups... ' + err));

    // e.preventDefault();

    // const country = inputValue.toUpperCase();

    // if (!country) return;
    // if (countries.includes(country)) {
    //   alert('Ten kraj jest już na liście.');
    //   return;
    // }

    // countries.unshift(country);
    // setCountries([...countries]);
    // setInputValue('');
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
