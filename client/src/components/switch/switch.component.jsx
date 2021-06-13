import React from 'react';

import './switch.styles.scss';

const Switch = ({ label, handleChange, isOn, id, ...props }) => (
  <div className="switch">
    <div className="switch__container">
      <input
        className="switch__checkbox"
        id={id}
        type="checkbox"
        checked={isOn}
        onChange={handleChange}
        {...props}
      />
      <label className="switch__label" htmlFor={id} />
      <div className="switch__circle" />
    </div>
    <p className="switch__text">{label}</p>
  </div>
);

export default Switch;
