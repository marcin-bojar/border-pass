import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  handleClick,
  clear,
  inline,
  navbar,
  ...props
}) => (
  <button
    className={`${clear ? 'clear' : ''} ${inline ? 'inline' : ''} ${
      navbar ? 'navbar' : ''
    } custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
