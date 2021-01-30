import React, { useContext } from 'react';

import CountrySelect from '../country-select/country-select.component';
import CurrentCountry from '../current-country/current-country.component';
import History from '../history/history.component';
import Welcome from '../welcome/welcome.component';

import { AppContext } from '../../hooks/useAppState';

import './app-view.styles.scss';

const AppView = () => {
  const { currentUser, guestUser } = useContext(AppContext);

  if (!currentUser && !guestUser) return <Welcome />;

  return (
    <div className="app-view">
      <CurrentCountry />
      <CountrySelect />
      <History />
    </div>
  );
};

export default AppView;
