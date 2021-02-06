import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../assets/icons/transfer.svg';

import './logo.styles.scss';

const Logo = () => (
  <Link to="/" className="logo">
    <h1 className="logo__title">Border</h1>
    <Icon className="logo__icon" />
    <h1 className="logo__title">Pass</h1>
  </Link>
);

export default Logo;
