import React from 'react';

import './loader.styles.scss';

const Loader = () => (
  <div className="loader">
    <div className="loader__container">
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
    </div>
  </div>
);

export default Loader;
