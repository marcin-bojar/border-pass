import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './new-version-bar.component.styles.scss';

const NewVersionBar = () => {
  return (
    <div className="new-version-bar">
      <p>Nowa wersja aplikacji dostępna!</p>
      <div className="new-version-bar__button-wrapper">
        <CustomButton inline>Odswież</CustomButton>
        <CustomButton inline>Zamknij</CustomButton>
      </div>
    </div>
  );
};

export default NewVersionBar;
