import { useState } from 'react';

const useSingleInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);
  };

  return { inputValue, setInputValue, handleChange };
};

export default useSingleInput;
