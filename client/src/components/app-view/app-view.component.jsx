import React from 'react';

import CountrySelect from '../country-select/country-select.component';
import TripEvents from '../trip-events/trip-events.component';
import CurrentCountry from '../current-country/current-country.component';
import Places from '../places/places.component';
import History from '../history/history.component';

const AppView = () => (
  <div className="app-view">
    <CurrentCountry />
    <TripEvents />
    <CountrySelect />
    <Places />
    <History />
  </div>
);
export default AppView;
