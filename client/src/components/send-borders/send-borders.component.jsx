import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import HistoryList from '../history-list/history-list.component';
import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';
import { getConfig } from '../../utils';

import './send-borders.styles.scss';

const SendBorders = () => {
  const {
    userState: { currentUser },
    dataState: { historyList, selection },
    setUserState,
    setDataState,
    setUiState,
    setSendMode,
    isMakingApiCall,
    setIsMakingApiCall,
  } = useContext(AppContext);
  const [listToSend, setListToSend] = useState([]);

  useEffect(() => {
    setSendMode(true);

    return () => {
      setSendMode(false);
      setDataState({ type: 'CLEAR_SELECTION' });
    };
  }, []);

  useEffect(() => {
    const { startIndex, endIndex } = selection;

    if (startIndex !== null && endIndex !== null) {
      setListToSend(historyList.slice(startIndex, endIndex + 1));
    } else setListToSend([]);
  }, [selection]);

  const sendAndArchive = () => {
    if (!listToSend.length) {
      setUiState({
        type: 'SET_MODAL_DATA',
        payload: {
          type: 'error',
          text: 'Musisz określić zakres danych do wysłania.',
        },
      });
      return;
    }

    const {
      _id,
      company: { companyEmail },
    } = currentUser;
    const { startIndex } = selection;

    if (!companyEmail) {
      setUiState({
        type: 'SET_MODAL_DATA',
        payload: {
          type: 'error',
          text: 'Aby wysłać zestawienie, zapisz adres email Twojej firmy w ustawieniach.',
        },
      });
      return;
    }

    setIsMakingApiCall(true);
    axios
      .post(`/api/users/${_id}/send`, { borders: listToSend, email: companyEmail }, getConfig())
      .then(() => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList.splice(startIndex, listToSend.length);

        return axios.put(`/api/users/${_id}/borders`, updatedHistoryList, getConfig());
      })
      .then(res => {
        setUserState({ type: 'SET_USER', payload: res.data.data });
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'info',
            text: `Zestawienie wysłane. Dane z wybranego zakresu zostały zarchiwizowane.`,
          },
        });
        setDataState({ type: 'CLEAR_SELECTION' });
      })
      .catch(err => {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'error',
            text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
          },
        });
      })
      .finally(() => setIsMakingApiCall(false));
  };

  const onlyArchive = () => {
    if (!listToSend.length) {
      setUiState({
        type: 'SET_MODAL_DATA',
        payload: {
          type: 'error',
          text: 'Musisz określić zakres danych do archiwizacji.',
        },
      });
      return;
    }

    setIsMakingApiCall(true);
    const { _id } = currentUser;
    const { startIndex } = selection;

    axios
      .post('/api/tables', { borders: listToSend }, getConfig())
      .then(() => {
        const updatedBorders = [...historyList];
        updatedBorders.splice(startIndex, listToSend.length);

        return axios.put(`/api/users/${_id}/borders`, updatedBorders, getConfig());
      })
      .then(res => {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'info',
            text: 'Dane zostały zarchiwizowane.',
          },
        });
        setUserState({ type: 'SET_USER', payload: res.data.data });
        setDataState({ type: 'CLEAR_SELECTION' });
      })
      .catch(err => {
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'error',
            text: err?.response?.data?.error || 'Coś poszło nie tak, spróbuj ponownie.',
          },
        });
      })
      .finally(() => setIsMakingApiCall(false));
  };

  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="send-borders">
      <h2 className="send-borders__title">Wysyłanie zestawienia</h2>
      <div className="send-borders__block">
        <p className="send-borders__paragraph">
          1. Wybierz dane z listy. Możesz wybrać zakres danych klikając na pierwszy i ostatni
          element interesującego Cię zakresu lub zaznaczyć wszystkie elementy.
        </p>
        <p className="send-borders__paragraph">2. Wyślij i/lub archiwizuj wybrane dane.</p>
        <p className="send-borders__paragraph">Dane w archiwum dostępne są przez 6 miesięcy.</p>
      </div>
      <div className="send-borders__button-wrapper">
        <CustomButton
          handleClick={() =>
            setDataState({
              type: 'SET_SELECTION',
              payload: { startIndex: 0, endIndex: historyList.length - 1 },
            })
          }
        >
          Zaznacz wszystko
        </CustomButton>
        <CustomButton handleClick={() => setDataState({ type: 'CLEAR_SELECTION' })}>
          Usuń zaznaczenie
        </CustomButton>
      </div>
      <div className="send-borders__button-wrapper">
        <CustomButton disabled={isMakingApiCall || !listToSend.length} handleClick={sendAndArchive}>
          Wyślij i archiwizuj
        </CustomButton>
        <CustomButton disabled={isMakingApiCall || !listToSend.length} handleClick={onlyArchive}>
          Archiwizuj dane
        </CustomButton>
      </div>
      <HistoryList />
    </div>
  );
};

export default SendBorders;
