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
  active,
  setWidth,
  ...props
}) => (
  <button
    style={setWidth ? { width: setWidth } : null}
    className={`${active ? 'active' : ''} ${clear ? 'clear' : ''} ${inline ? 'inline' : ''} ${
      navbar ? 'navbar' : ''
    } ${navbarUser ? 'navbar--user' : ''} ${link ? 'link' : ''} custom-button`}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
