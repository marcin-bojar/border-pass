import { useState, useEffect, createContext, useReducer } from 'react';
import axios from 'axios';

import { userReducer, USER_INITIAL_STATE } from '../reducers/userReducer';

import { sortHistoryListByTimeAndDate, getConfig, sortUsersBorders } from '../utils';
import defaultCountries from '../../../helpers/defaultCountries';
import { registerSW } from '../service-worker';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [userData, setUserData] = useReducer(userReducer, USER_INITIAL_STATE);
  const { currentUser, token } = userData;

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
          setUserData({ type: 'SET_USER', payload: res.data.data });
        })
        .catch(() => {
          setUserData({ type: 'USER_AUTH_ERROR', payload: 'Sesja wygasła. Zaloguj się ponownie.' });
          setModalData({
            type: 'authError',
            text: 'Sesja wygasła. Zaloguj się ponownie.',
          });
        });
    } else setUserData({ type: 'SET_USER_LOADING', payload: false });

    registerSW(setNewVersion);
  }, []);

  return {
    userData,
    setUserData,
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
