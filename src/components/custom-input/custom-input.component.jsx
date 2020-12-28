import React, { useState, useContext, useEffect, useRef } from 'react';

import './custom-input.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const CustomInput = ({ label, ...props }) => {
  const [inputValue, setInputValue] = useState('');
  const { countries, setCountries } = useContext(AppContext);
  const inputRef = useRef(null);

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = e => {
    const country = e.target.value.toUpperCase();
    if (!country || countries.includes(country)) return;

    countries.unshift(country);
    setCountries([...countries]);
    setInputValue('');
    console.log(countries);
  };

  const listener = e => {
    if (e.target !== inputRef.current) return;

    if (e.key !== undefined) {
      if (e.key === 'Enter') handleSubmit(e);

      //Legacy browsers
    } else if (e.keyCode !== undefined || e.which !== undefined) {
      if (e.keyCode === 13 || e.which === 13) handleSubmit(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, []);

  return (
    <div className="custom-input">
      <input
        type="text"
        className="custom-input__input"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
        {...props}
      />
      {label && (
        <label className={`${inputValue ? 'shrink' : ''} custom-input__label`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomInput;
