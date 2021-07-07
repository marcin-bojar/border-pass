import React from 'react';

import Select from '../select/select.component';
import TripEvents from '../trip-events/trip-events.component';
import CurrentCountry from '../current-country/current-country.component';
import History from '../history/history.component';

const AppView = () => (
  <div className="app-view" data-test="app">
    <CurrentCountry />
    <TripEvents />
    <Select />
    <Select placesSelect />
    <History />
  </div>
);
export default AppView;
