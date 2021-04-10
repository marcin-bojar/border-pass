import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import Welcome from '../welcome/welcome.component';

import { AppContext } from '../../hooks/useAppState';

import './current-country.styles.scss';

const CurrentCountry = () => {
  const {
    dataState: { currentCountry },
    setDataState,
  } = useContext(AppContext);

  if (!currentCountry) return <Welcome />;

  return (
    <div className="current-country">
      <h2 className="current-country__title">Obecnie znajdujesz się w: </h2>
      <span className="current-country__country">{currentCountry}</span>
      <div className="current-country__button-wrapper">
        <CustomButton
          clear
          handleClick={() => setDataState({ type: 'SET_CURRENT_COUNTRY', payload: '' })}
        >
          Wyczyść
        </CustomButton>
      </div>
    </div>
  );
};

export default CurrentCountry;
