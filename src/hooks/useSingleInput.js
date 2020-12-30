import { useState, useRef } from 'react';

const useSingleInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
  };

  const inputRef = useRef(null);

  return { inputRef, inputValue, setInputValue, handleChange };
};

export default useSingleInput;
