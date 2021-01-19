import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import { sortHistoryListByTimeAndDate } from '../utils';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCountry, setCurrentCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [borders, setBorders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isSortedDesc, setIsSortedDesc] = useState(
    Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
  );
  const [isFetchingBorders, setIsFetchingBorders] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(true);
  const [disableUndoButton, setDisableUndoButton] = useState(false);

  useEffect(() => {
    if (currentUser)
      setBorders(
        sortHistoryListByTimeAndDate(currentUser.borders, isSortedDesc)
      );
    else
      setBorders(
        sortHistoryListByTimeAndDate(
          JSON.parse(localStorage.getItem('borders')),
          isSortedDesc
        )
      );
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('borders', JSON.stringify(borders));

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
      .get('/api/countries')
      .then(res => {
        setCountries([...res.data.data]);
        setIsFetchingCountries(false);
      })
      .catch(err => console.log(err.message));
  }, []);

  return {
    currentUser,
    setCurrentUser,
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
