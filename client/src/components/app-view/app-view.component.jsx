import React, { useContext } from 'react';

import CountrySelect from '../country-select/country-select.component';
import CurrentCountry from '../current-country/current-country.component';
import History from '../history/history.component';
import Welcome from '../welcome/welcome.component';
import Loader from '../loader/loader.component';

import { AppContext } from '../../hooks/useAppState';

import './app-view.styles.scss';

const AppView = () => {
  const { currentUser, userLoading, guestUser } = useContext(AppContext);

  if (userLoading) return <Loader />;
  else if (!currentUser && !guestUser) return <Welcome />;

  return (
    <div className="app-view">
      <CurrentCountry />
      <CountrySelect />
      <History />
    </div>
  );
};

export default AppView;
