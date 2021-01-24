import React from 'react';

import CountrySelect from '../country-select/country-select.component';
import CurrentCountry from '../current-country/current-country.component';
import History from '../history/history.component';

import './app-view.styles.scss';

const AppView = () => (
  <div className="app-view">
    <CurrentCountry />
    <CountrySelect />
    <History />
  </div>
);

export default AppView;
