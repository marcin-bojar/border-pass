import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, handleClick, clear }) => (
  <button
    className={`${clear ? 'clear' : ''} custom-button`}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default CustomButton;
