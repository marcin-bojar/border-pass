import React from 'react';

import './spinner.styles.scss';

const Spinner = ({ isLoading }) => (
  <div className="spinner">
    {isLoading ? (
      <div className="spinner__overlay">
        <div className="spinner__circle"></div>
      </div>
    ) : null}
  </div>
);

export default Spinner;
