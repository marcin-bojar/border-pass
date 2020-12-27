import React from 'react';

import Logo from '../logo/logo.component';

import './heading.styles.scss';

const Heading = () => (
  <div className="heading">
    <Logo />
    <h2 className="heading__subtitle">Rejestruj swoje przekroczenia granic</h2>
  </div>
);

export default Heading;
