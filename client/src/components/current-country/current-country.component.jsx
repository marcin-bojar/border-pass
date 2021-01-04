import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './current-country.styles.scss';

const CurrentCountry = () => {
  const { currentCountry, setCurrentCountry } = useContext(AppContext);
  return (
    <div className="current-country">
      <h2 className="current-country__title">Obecnie znajdujesz się w: </h2>
      <span className="current-country__country">{currentCountry}</span>
      <div className="current-country__button-wrapper">
        <CustomButton clear handleClick={() => setCurrentCountry('')}>
          Wyczyść
        </CustomButton>
      </div>
    </div>
  );
};

export default CurrentCountry;