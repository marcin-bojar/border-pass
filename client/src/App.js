import React from 'react';

import Heading from './components/heading/heading.component';
import Welcome from './components/welcome/welcome.component';
import CountrySelect from './components/country-select/country-select.component';
import CurrentCountry from './components/current-country/current-country.component';
import History from './components/history/history.component';

import { AppContext, useAppState } from './hooks/useAppState';

import './App.scss';

const App = () => {
  const appState = useAppState();
  const { currentCountry } = appState;

  return (
    <div className="App">
      <AppContext.Provider value={appState}>
        <Heading />
        {currentCountry ? <CurrentCountry /> : <Welcome />}
        <CountrySelect />
        <History />
      </AppContext.Provider>
    </div>
  );
};

export default App;
