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

  const [showAll, setShowAll] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editedItem, setEditedItem] = useState(null);

  const [isSortedDesc, setIsSortedDesc] = useState(
    Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
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

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  return {
    currentCountry,
    setCurrentCountry,
    borders,
    setBorders,
    countries,
    setCountries,
    showAll,
    setShowAll,
    editMode,
    setEditMode,
    editedItem,
    setEditedItem,
    isSortedDesc,
    setIsSortedDesc,
  };
};
