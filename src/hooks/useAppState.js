import { useState, useEffect, createContext } from 'react';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [currentCountry, setCurrentCountry] = useState(
    localStorage.getItem('currentCountry')
  );

  const [countries, setCountries] = useState([
    'PL',
    'CZ',
    'SK',
    'DE',
    'HU',
    'NL',
    'BE',
    'FR',
    'AT',
    'CH',
  ]);

  const [borders, setBorders] = useState(localStorage.getItem('borders') || []);

  useEffect(() => {
    localStorage.setItem('currentCountry', currentCountry);
  }, [currentCountry]);

  return {
    currentCountry,
    setCurrentCountry: setCurrentCountry,
    setBorder: setBorders.bind(null, borders),
    countries: countries,
  };
};
