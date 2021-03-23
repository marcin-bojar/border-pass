import React, { useState, useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './new-version-bar.component.styles.scss';

const NewVersionBar = () => {
  const [show, setShow] = useState(true);
  const { newVersion } = useContext(AppContext);

  if (!show || !newVersion.status) {
    return null;
  }

  return (
    <div className="new-version-bar">
      <p>Nowa wersja aplikacji dostępna!</p>
      <div className="new-version-bar__button-wrapper">
        <CustomButton inline handleClick={() => newVersion.onConfirm()}>
          Odśwież
        </CustomButton>
        <CustomButton inline handleClick={() => setShow(false)}>
          Nie teraz
        </CustomButton>
      </div>
    </div>
  );
};

export default NewVersionBar;
