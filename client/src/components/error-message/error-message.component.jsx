import React from 'react';

import './error-message.styles.scss';

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message">
      <p className="error-message__text">{error}</p>
    </div>
  );
};

export default ErrorMessage;
