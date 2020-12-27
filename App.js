import React, { useState, useEffect } from 'react';

import Heading from './src/components/heading/heading.component';
import Welcome from './src/components/welcome/welcome.component';
import CountrySelect from './src/components/country-select/country-select.component';
import CurrentCountry from './src/components/current-country/current-country.component';

import './App.scss';

const App = () => {
  const currentCountry = localStorage.getItem('currentCountry');

  const [borders, setBorders] = useState(localStorage.getItem('borders') || []);

  return (
    <div className="App">
      <Heading />
      {currentCountry ? (
        <CurrentCountry country={currentCountry} />
      ) : (
        <Welcome />
      )}
      <CountrySelect countries={['PL', 'CZ', 'SK', 'DE']} />
    </div>
  );
};

export default App;
