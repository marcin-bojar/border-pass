import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  handleClick,
  clear,
  inline,
  navbar,
  navbarUser,
  link,
  ...props
}) => (
  <button
    tabIndex="1"
    className={`${clear ? 'clear' : ''} ${inline ? 'inline' : ''} ${
      navbar ? 'navbar' : ''
    } ${navbarUser ? 'navbar--user' : ''} ${link ? 'link' : ''} custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
