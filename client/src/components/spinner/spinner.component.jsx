import React from 'react';

import './spinner.styles.scss';

const Spinner = () => (
  <div className="spinner">
    <div className="spinner__overlay">
      <div className="spinner__circle"></div>
    </div>
  </div>
);

export default Spinner;
