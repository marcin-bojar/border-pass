import React from 'react';

import Heading from './src/components/heading/heading.component';
import Welcome from './src/components/welcome/welcome.component';
import CountrySelect from './src/components/country-select/country-select.component';
import CurrentCountry from './src/components/current-country/current-country.component';
import History from './src/components/history/history.component';

import { AppContext, useAppState } from './src/hooks/useAppState';

import './App.scss';

const App = () => {
  const appState = useAppState();
  const { currentCountry, borders } = appState;

  return (
    <div className="App">
      <AppContext.Provider value={appState}>
        <Heading />
        {currentCountry ? <CurrentCountry /> : <Welcome />}
        <CountrySelect />
        {borders.length ? <History /> : null}
      </AppContext.Provider>
    </div>
  );
};

export default App;
