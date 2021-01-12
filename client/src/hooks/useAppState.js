import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import { sortHistoryListByTimeAndDate } from '../utils';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [currentCountry, setCurrentCountry] = useState('');

  const [countries, setCountries] = useState([]);

  const [borders, setBorders] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editedItem, setEditedItem] = useState(null);

  const [isSortedDesc, setIsSortedDesc] = useState(
    Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
  );

  const [isFetchingBorders, setIsFetchingBorders] = useState(true);

  const [isFetchingCountries, setIsFetchingCountries] = useState(true);

  const [disableUndoButton, setDisableUndoButton] = useState(false);

  useEffect(() => {
    localStorage.setItem('borders', JSON.stringify(borders));
    const length = borders.length;
    if (!length) setCurrentCountry('');
    else if (length && isSortedDesc) setCurrentCountry(borders[0].to);
    else if (length && !isSortedDesc) setCurrentCountry(borders[length - 1].to);
  }, [borders]);

  useEffect(() => {
    localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    axios
      .get('/api/borders')
      .then(res => {
        if (isSortedDesc)
          setBorders([
            ...sortHistoryListByTimeAndDate(res.data.data, isSortedDesc),
          ]);
        else setBorders([...res.data.data]);
        setIsFetchingBorders(false);
      })
      .catch(err => console.log(err.message));

    axios
      .get('/api/countries')
      .then(res => {
        setCountries([...res.data.data]);
        setIsFetchingCountries(false);
      })
      .catch(err => console.log(err.message));

    // borders.forEach(border => {
    //   axios
    //     .post('http://localhost:5000/api/borders', border)
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err));
    // });

    // countries.forEach(c => {
    //   console.log({ name: c });
    //   axios
    //     .post('http://localhost:5000/api/countries', { name: c })
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
    setIsFetchingBorders,
    isFetchingCountries,
    setIsFetchingCountries,
    disableUndoButton,
    setDisableUndoButton,
  };
};
