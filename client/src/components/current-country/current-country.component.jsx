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
    <div className="current-country" data-test="current-country-container">
      <h2 className="current-country__title" data-test="title">
        Obecnie znajdujesz się w:{' '}
      </h2>
      <span className="current-country__country" data-test="current-country">
        {currentCountry}
      </span>
      <div className="current-country__button-wrapper">
        <CustomButton
          setWidth="8.4rem"
          clear
          data-test="clear-current-country"
          handleClick={() => setDataState({ type: 'SET_CURRENT_COUNTRY', payload: '' })}
        >
          Wyczyść
        </CustomButton>
      </div>
    </div>
  );
};

export default CurrentCountry;
