import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import { sortHistoryListByTimeAndDate, getConfig, sortUsersBorders } from '../utils';
import defaultCountries from '../../../helpers/defaultCountries';
import { registerSW } from '../service-worker';

export const AppContext = createContext(null);

export const useAppState = () => {
  //User state
  const [currentUser, setCurrentUser] = useState(null);
  const [guestUser, setGuestUser] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null);
  const [userLoading, setUserLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  //Data state
  const [currentCountry, setCurrentCountry] = useState('');
  const [countries, setCountries] = useState(
    JSON.parse(localStorage.getItem('countries')) || defaultCountries
  );
  const [borders, setBorders] = useState(JSON.parse(localStorage.getItem('borders')) || []);
  const [showAll, setShowAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [sendMode, setSendMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isSortedDesc, setIsSortedDesc] = useState(
    Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
  );
  const [selection, setSelection] = useState({
    startIndex: null,
    endIndex: null,
  });

  //API calls state
  const [isMakingApiCall, setIsMakingApiCall] = useState(false);

  //UI state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  //App state
  const [newVersion, setNewVersion] = useState({
    status: false,
    onConfirm: () => {},
  });

  useEffect(() => {
    if (!currentUser) localStorage.setItem('borders', JSON.stringify(borders));

    const length = borders.length;
    if (!length) setCurrentCountry('');
    else if (length && isSortedDesc) setCurrentCountry(borders[0].to);
    else setCurrentCountry(borders[length - 1].to);
  }, [borders]);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    if (currentUser) {
      const user = sortUsersBorders(currentUser, !isSortedDesc);
      setBorders([...user.borders]);
      setCountries([...user.countries]);
    } else {
      const borders = sortHistoryListByTimeAndDate(
        [...JSON.parse(localStorage.getItem('borders'))],
        !isSortedDesc,
        'timestamp'
      );
      setBorders(borders);
      setCountries([...JSON.parse(localStorage.getItem('countries'))]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (modalData) setShowModal(true);
  }, [modalData]);

  useEffect(() => {
    if (token) {
      axios
        .get('/api/auth/user', getConfig())
        .then(res => {
          setCurrentUser(res.data.data);
          setAuthError(null);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuthError('Sesja wygasła. Zaloguj się ponownie.');
          setModalData({
            type: 'authError',
            text: 'Sesja wygasła. Zaloguj się ponownie.',
          });
        })
        .finally(() => setUserLoading(false));
    } else setUserLoading(false);

    registerSW(setNewVersion);
  }, []);

  return {
    currentUser,
    setCurrentUser,
    guestUser,
    setGuestUser,
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
    sendMode,
    setSendMode,
    editedItem,
    setEditedItem,
    isSortedDesc,
    setIsSortedDesc,
    isMakingApiCall,
    setIsMakingApiCall,
    showModal,
    setShowModal,
    modalData,
    setModalData,
    showUserMenu,
    setShowUserMenu,
    selection,
    setSelection,
    newVersion,
    setNewVersion,
  };
};
