import React, { useContext } from 'react';

import CustomInput from '../custom-input/custom-input.component';

import useSingleInput from '../../hooks/useSingleInput';
import { AppContext } from '../../hooks/useAppState';

import './add-country.styles.scss';

const AddCountry = () => {
  const { inputValue, setInputValue, handleChange } = useSingleInput();
  const { countries, setCountries } = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();

    const country = inputValue.toUpperCase();

    if (!country) return;
    if (countries.includes(country)) {
      alert('Ten kraj jest już na liście.');
      return;
    }

    countries.unshift(country);
    setCountries([...countries]);
    setInputValue('');
  };

  return (
    <div className="add-country">
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={inputValue}
          handleChange={handleChange}
          maxLength="3"
          label="Dodaj kraj"
        />
      </form>
    </div>
  );
};

export default AddCountry;
