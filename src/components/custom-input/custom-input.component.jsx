import React, { forwardRef } from 'react';

import './custom-input.styles.scss';

const CustomInput = forwardRef(
  ({ label, handleChange, value, ...props }, ref) => (
    <div className="custom-input">
      <input
        className="custom-input__input"
        onChange={handleChange}
        value={value}
        ref={ref}
        {...props}
      />
      {label && (
        <label className={`${value ? 'shrink' : ''} custom-input__label`}>
          {label}
        </label>
      )}
    </div>
  )
);

export default CustomInput;
