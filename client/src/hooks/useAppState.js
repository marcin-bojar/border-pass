import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import { sortHistoryListByTimeAndDate } from '../utils';
import defaultCountries from '../../../helpers/defaultCountries';

export const AppContext = createContext(null);

export const useAppState = () => {
  //User state
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || null
  );
  const [userLoading, setUserLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  //Data state
  const [currentCountry, setCurrentCountry] = useState('');
  const [countries, setCountries] = useState(
    JSON.parse(localStorage.getItem('countries')) || defaultCountries
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

  //Fetching state
  const [isFetchingBorders, setIsFetchingBorders] = useState(false);
  const [isFetchingCountries, setIsFetchingCountries] = useState(false);
  const [disableUndoButton, setDisableUndoButton] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('borders', JSON.stringify(borders));
      sortHistoryListByTimeAndDate(borders, isSortedDesc, 'timestamp');
    } else sortHistoryListByTimeAndDate(borders, isSortedDesc);

    const length = borders.length;
    if (!length) setCurrentCountry('');
    else if (length && isSortedDesc) setCurrentCountry(borders[0].to);
    else setCurrentCountry(borders[length - 1].to);
  }, [borders]);

  useEffect(() => {
    if (!currentUser)
      localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    if (currentUser) {
      setBorders([...currentUser.borders]);
      setCountries([...currentUser.countries]);
    } else {
      setBorders([...JSON.parse(localStorage.getItem('borders'))]);
      setCountries([...JSON.parse(localStorage.getItem('countries'))]);
    }
  }, [currentUser]);

  useEffect(() => {
    const config = {
      headers: {},
    };

    if (token) {
      setUserLoading(true);
      config.headers['x-access-token'] = token;

      axios
        .get('/api/auth/user', config)
        .then(res => {
          setCurrentUser(res.data.data);
          setUserLoading(false);
          setAuthError(null);
        })
        .catch(err => {
          localStorage.removeItem('token');
          setUserLoading(false);
          setAuthError('Sesja wygasła. Zaloguj się ponownie.');
        });
    }
  }, []);

  return {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    userLoading,
    setUserLoading,
    authError,
    setAuthError,
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
