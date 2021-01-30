import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  handleClick,
  clear,
  inline,
  navbar,
  link,
  ...props
}) => (
  <button
    className={`${clear ? 'clear' : ''} ${inline ? 'inline' : ''} ${
      navbar ? 'navbar' : ''
    } ${link ? 'link' : ''} custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
