import { useState, useEffect, createContext, useReducer } from 'react';
import axios from 'axios';

import { userReducer, USER_INITIAL_STATE } from '../reducers/userReducer';

import { sortHistoryListByTimeAndDate, getConfig, sortUsersBorders } from '../utils';
import defaultCountries from '../../../helpers/defaultCountries';
import { registerSW } from '../service-worker';

export const AppContext = createContext(null);

const DATA_INITIAL_STATE = {
  currentCountry: '',
  countries: JSON.parse(localStorage.getItem('countries')) || defaultCountries,
  historyList: JSON.parse(localStorage.getItem('borders')) || [],
  editedItem: null,
  isSortedDesc: Boolean(localStorage.getItem('isSortedDesc') === 'true') || false,
  selection: { startIndex: null, endIndex: null },
};

const dataReducer = (state, action) => {
  const { payload } = action;

  switch (payload) {
    case 'SET_HISTORY_LIST':
      return {
        ...state,
        historyList: payload,
        currentCountry: !payload.length
          ? ''
          : state.isSortedDesc
          ? payload[0].to
          : payload[length - 1].to,
        editedItem: null,
      };

    case 'REVERSE_HISTORY_LIST':
      return {
        ...state,
        historyList: payload,
        isSortedDesc: !state.isSortedDesc,
      };

    case 'SEND_MODE_ON':
      return {
        ...state,
        historyList: [...sortHistoryListByTimeAndDate([...state.historyList], true)],
        isSortedDesc: false,
      };

    case 'SEND_MODE_OFF':
      return {
        ...state,
        historyList: [...sortHistoryListByTimeAndDate([...state.historyList], false)],
        isSortedDesc: true,
      };

    case 'SET_SELECTION':
      return {
        ...state,
        selection: payload,
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selection: { startIndex: null, endIndex: null },
      };

    case 'SET_DATA_WHEN_USER_LOGIN':
      return {
        ...state,
        historyList: payload.historyList,
        countries: payload.countries,
      };

    case 'SET_DATA_WHEN_USER_LOGOUT':
      return {
        ...state,
        historyList: sortHistoryListByTimeAndDate(
          [...JSON.parse(localStorage.getItem('borders'))],
          !isSortedDesc,
          'timestamp'
        ),
        countries: [...JSON.parse(localStorage.getItem('countries'))],
      };

    case 'SET_CURRENT_COUNTRY':
      return {
        ...state,
        currentCountry: payload,
      };

    default:
      return state;
  }
};

export const useAppState = () => {
  const [userState, setUserState] = useReducer(userReducer, USER_INITIAL_STATE);
  const [dataState, setDataState] = useReducer(dataReducer, DATA_INITIAL_STATE);
  console.log(userState);
  console.log(dataState);

  const { currentUser, token } = userState;
  const { historyList, countries, isSortedDesc } = dataState;

  //Data state
  // const [currentCountry, setCurrentCountry] = useState('');
  // const [countries, setCountries] = useState(
  //   JSON.parse(localStorage.getItem('countries')) || defaultCountries
  // );
  // const [borders, setBorders] = useState(JSON.parse(localStorage.getItem('borders')) || []);
  // const [editedItem, setEditedItem] = useState(null);
  // const [isSortedDesc, setIsSortedDesc] = useState(
  //   Boolean(localStorage.getItem('isSortedDesc') === 'true') || false
  // );
  // const [selection, setSelection] = useState({
  //   startIndex: null,
  //   endIndex: null,
  // });

  //UI state
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  //App state
  const [newVersion, setNewVersion] = useState({
    status: false,
    onConfirm: () => {},
  });
  const [editMode, setEditMode] = useState(false);
  const [sendMode, setSendMode] = useState(false);
  const [isMakingApiCall, setIsMakingApiCall] = useState(false);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('borders', JSON.stringify(historyList));
  }, [historyList]);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    if (currentUser) {
      const user = sortUsersBorders(currentUser, !isSortedDesc);
      setDataState({
        type: 'SET_DATA_WHEN_USER_LOGIN',
        payload: { historyList: [...user.borders], countries: [...user.countries] },
      });
    } else {
      setDataState({ type: 'SET_DATA_WHEN_USER_LOGOUT' });
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
          setUserState({ type: 'SET_USER', payload: res.data.data });
        })
        .catch(() => {
          setUserState({
            type: 'USER_AUTH_ERROR',
            payload: 'Sesja wygasła. Zaloguj się ponownie.',
          });
          setModalData({
            type: 'authError',
            text: 'Sesja wygasła. Zaloguj się ponownie.',
          });
        });
    } else setUserState({ type: 'SET_USER_LOADING', payload: false });

    registerSW(setNewVersion);
  }, []);

  return {
    userState,
    setUserState,
    dataState,
    setDataState,
    editMode,
    setEditMode,
    sendMode,
    setSendMode,
    isMakingApiCall,
    setIsMakingApiCall,
    showModal,
    setShowModal,
    modalData,
    setModalData,
    showUserMenu,
    setShowUserMenu,
    newVersion,
    setNewVersion,
  };
};
