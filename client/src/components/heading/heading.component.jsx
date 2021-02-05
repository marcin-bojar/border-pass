import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../logo/logo.component';

import './heading.styles.scss';

const Heading = () => (
  <Link to="/" className="heading">
    <Logo />
    <h2 className="heading__subtitle">Rejestruj swoje przekroczenia granic</h2>
  </Link>
);

export default Heading;
