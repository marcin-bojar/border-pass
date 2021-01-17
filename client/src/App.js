import React from 'react';

import Heading from './components/heading/heading.component';
import CountrySelect from './components/country-select/country-select.component';
import CurrentCountry from './components/current-country/current-country.component';
import History from './components/history/history.component';
import SignIn from './components/sign-in/sign-in.component';

import { AppContext, useAppState } from './hooks/useAppState';

import './App.scss';

const App = () => {
  const appState = useAppState();

  return (
    <div className="App">
      <AppContext.Provider value={appState}>
        <Heading />
        <SignIn />
        <CurrentCountry />
        <CountrySelect />
        <History />
      </AppContext.Provider>
    </div>
  );
};

export default App;
