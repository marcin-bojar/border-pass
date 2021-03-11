import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import HistoryList from '../history-list/history-list.component';
import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';
import { getConfig } from '../../utils';

import './send-borders.styles.scss';

const SendBorders = () => {
  const {
    borders,
    setBorders,
    setSendMode,
    selection,
    setSelection,
    setIsMakingApiCall,
    currentUser,
    setModalData,
  } = useContext(AppContext);
  let bordersToSend;

  useEffect(() => {
    setSendMode(true);
    return () => {
      setSendMode(false);
      setSelection({ startIndex: null, endIndex: null });
    };
  }, []);

  useEffect(() => {
    const { startIndex, endIndex } = selection;
    if (startIndex !== null && endIndex !== null) {
      bordersToSend = borders.slice(startIndex, endIndex + 1);
    } else bordersToSend = undefined;
  }, [selection]);

  const sendAndArchive = () => {
    if (!bordersToSend) {
      setModalData({
        type: 'error',
        text: 'Musisz określić zakres danych do wysłania.',
      });
      return;
    }

    setIsMakingApiCall(true);
    const {
      _id,
      company: { companyEmail },
    } = currentUser;
    const { startIndex } = selection;

    axios
      .post(
        `/api/users/${_id}/send`,
        { borders: bordersToSend, email: companyEmail },
        getConfig()
      )
      .then(res => {
        setModalData({
          type: 'info',
          text: `Zestawienie wysłane na adres ${res.data.data.accepted[0]}`,
        });
        borders.splice(startIndex, bordersToSend.length);
        setBorders([...borders]);
        setSelection({ startIndex: null, endIndex: null });
      })
      .catch(err => {
        setModalData({ type: 'error', text: err.response.data.error });
      })
      .finally(setIsMakingApiCall(false));
  };

  return (
    <div className="send-borders">
      <h2 className="send-borders__title">Wysyłanie zestawienia</h2>
      <div className="send-borders__button-wrapper">
        <CustomButton handleClick={sendAndArchive}>
          Wyślij i archiwizuj
        </CustomButton>
        <CustomButton>Archiwizuj</CustomButton>
      </div>
      <HistoryList />
    </div>
  );
};

export default SendBorders;
