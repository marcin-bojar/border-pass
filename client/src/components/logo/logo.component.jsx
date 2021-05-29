import React from 'react';
import { Link } from 'react-router-dom';

import BorderPass from '../../assets/icons/logo.svg';

import './logo.styles.scss';

const Logo = () => (
  <Link to="/" className="logo">
    <BorderPass />
  </Link>
);

export default Logo;
