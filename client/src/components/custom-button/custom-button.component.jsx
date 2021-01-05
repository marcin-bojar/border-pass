import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, handleClick, clear, inline, ...props }) => (
  <button
    className={`${clear ? 'clear' : ''} ${
      inline ? 'inline' : ''
    } custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
