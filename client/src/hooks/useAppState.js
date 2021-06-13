import { useEffect, createContext, useReducer } from 'react';
import axios from 'axios';

import { userReducer, USER_INITIAL_STATE } from '../reducers/userReducer';
import { dataReducer, DATA_INITIAL_STATE } from '../reducers/dataReducer';
import { uiReducer, UI_INITIAL_STATE } from '../reducers/uiReducer';
import { generalReducer, GENERAL_INITIAL_STATE } from '../reducers/generalReducer';

import { getConfig, sortUsersBorders } from '../utils';
import { registerSW } from '../service-worker';

export const AppContext = createContext(null);

export const useAppState = () => {
  const [userState, setUserState] = useReducer(userReducer, USER_INITIAL_STATE);
  const [dataState, setDataState] = useReducer(dataReducer, DATA_INITIAL_STATE);
  const [uiState, setUiState] = useReducer(uiReducer, UI_INITIAL_STATE);
  const [generalState, setGeneralState] = useReducer(generalReducer, GENERAL_INITIAL_STATE);

  const { currentUser, token } = userState;
  const { historyList, countries, places, isSortedDesc } = dataState;
  const { modalData } = uiState;

  useEffect(() => {
    if (!currentUser) localStorage.setItem('borders', JSON.stringify(historyList));
  }, [historyList]);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('countries', JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    if (!currentUser) localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('isSortedDesc', isSortedDesc);
  }, [isSortedDesc]);

  useEffect(() => {
    if (currentUser) {
      const user = sortUsersBorders(currentUser, !isSortedDesc);
      setDataState({
        type: 'SET_USER_DATA',
        payload: {
          historyList: [...user.borders],
          countries: [...user.countries],
          places: [...user.places],
        },
      });
      setUiState({ type: 'SET_SHOW_PLACES', payload: user?.preferences.showPlaces });
    } else {
      setDataState({ type: 'SET_GUEST_DATA' });
    }
  }, [currentUser]);

  useEffect(() => {
    if (modalData) setUiState({ type: 'SHOW_MODAL' });
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
          setUiState({
            type: 'SET_MODAL_DATA',
            payload: {
              type: 'authError',
              text: 'Sesja wygasła. Zaloguj się ponownie.',
            },
          });
        });
    } else setUserState({ type: 'SET_USER_LOADING', payload: false });

    registerSW(setGeneralState);
  }, []);

  return {
    userState,
    setUserState,
    dataState,
    setDataState,
    uiState,
    setUiState,
    generalState,
    setGeneralState,
  };
};
