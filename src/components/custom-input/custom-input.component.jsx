import React, { useState, forwardRef, useEffect } from 'react';

import './custom-input.styles.scss';

const CustomInput = forwardRef(({ label, initialValue, ...props }, ref) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = e => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="custom-input">
      <input
        type="text"
        className="custom-input__input"
        value={inputValue || ''}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
      {label && (
        <label className={`${inputValue ? 'shrink' : ''} custom-input__label`}>
          {label}
        </label>
      )}
    </div>
  );
});

export default CustomInput;
