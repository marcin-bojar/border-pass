import { useState, useEffect, createContext } from 'react';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [currentCountry, setCurrentCountry] = useState(
    localStorage.getItem('currentCountry') || ''
  );

  const [countries, setCountries] = useState(
    JSON.parse(localStorage.getItem('countries')) || [
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
    ]
  );

  const [borders, setBorders] = useState(
    JSON.parse(localStorage.getItem('borders')) || []
  );

  useEffect(() => {
    localStorage.setItem('currentCountry', currentCountry);
  }, [currentCountry]);

  useEffect(() => {
    localStorage.setItem('borders', JSON.stringify(borders));
  }, [borders]);

  useEffect(() => {
    localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  return {
    currentCountry,
    setCurrentCountry,
    borders,
    setBorders,
    countries,
    setCountries,
  };
};
