import React from 'react';

import { useAppState } from './src/hooks/useAppState';

import Heading from './src/components/heading/heading.component';
import Welcome from './src/components/welcome/welcome.component';
import CountrySelect from './src/components/country-select/country-select.component';
import CurrentCountry from './src/components/current-country/current-country.component';

import { AppContext } from './src/hooks/useAppState';

import './App.scss';

const App = () => {
  const appState = useAppState();
  const { currentCountry } = appState;
  console.log(appState);
  return (
    <div className="App">
      <AppContext.Provider value={appState}>
        <Heading />
        {currentCountry ? <CurrentCountry /> : <Welcome />}
        <CountrySelect />
      </AppContext.Provider>
    </div>
  );
};

export default App;
