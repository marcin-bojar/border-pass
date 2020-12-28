import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, handleClick, clear, ...props }) => (
  <button
    className={`${clear ? 'clear' : ''} custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
