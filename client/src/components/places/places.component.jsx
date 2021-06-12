import React, { useContext } from 'react';

import AddCountry from '../add-country/add-country.component';
import CountryOption from '../country-option/country-option.component';

import { AppContext } from '../../hooks/useAppState';

import './places.styles.scss';

const Places = () => {
  const {
    userState: { currentUser },
    dataState: { places },
  } = useContext(AppContext);
  console.log(currentUser);

  return (
    <div className="places">
      <h3 className="places__title">Twoje miejsca</h3>
      <div className="places__options">
        {places.length ? (
          places.map(el => <CountryOption place key={el.name} name={el.name} />)
        ) : (
          <p>Brak danych</p>
        )}
      </div>
      <AddCountry label="Dodaj miejsce" />
    </div>
  );
};

export default Places;
