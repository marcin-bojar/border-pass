import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

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

  const [borders, setBorders] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editedItem, setEditedItem] = useState(null);

  const [isSortedDesc, setIsSortedDesc] = useState(
    Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
  );

  const [isFetchingBorders, setIsFetchingBorders] = useState(true);

  useEffect(() => {
    localStorage.setItem('currentCountry', currentCountry);
  }, [currentCountry]);

  // useEffect(() => {
  //   localStorage.setItem('borders', JSON.stringify(borders));
  // }, [borders]);

  useEffect(() => {
    localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/borders')
      .then(res => {
        setBorders([...res.data]);
        setIsFetchingBorders(false);
      })
      .catch(err => console.log(err));

    // borders.forEach(border => {
    //   axios
    //     .post('http://localhost:5000/api/borders', border)
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err));
    // });
  }, []);

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
    isFetchingBorders,
  };
};
