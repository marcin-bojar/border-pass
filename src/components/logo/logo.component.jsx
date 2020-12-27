import React from 'react';

import Icon from '../../assets/icons/transfer.svg';

import './logo.styles.scss';

const Logo = () => (
  <div className="logo">
    <h1 className="logo__title">Border</h1>
    <Icon className="logo__icon" />
    <h1 className="logo__title">Pass</h1>
  </div>
);

export default Logo;
