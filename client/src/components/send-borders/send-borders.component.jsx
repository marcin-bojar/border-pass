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
      <div className="send-borders__block">
        <p className="send-borders__paragraph">
          1. Wybierz dane z listy. Możesz wybrać zakres danych klikając na
          pierwszy i ostatni element interesującego Cię zakresu lub zaznaczyć
          wszystkie elementy.
        </p>
        <p className="send-borders__paragraph">
          2. Wyślij i/lub archiwizuj wybrane dane.
        </p>
        <p className="send-borders__paragraph">
          Dane w archiwum dostępne są przez 6 miesięcy.
        </p>
      </div>
      <div className="send-borders__button-wrapper">
        <CustomButton
          handleClick={() =>
            setSelection({ startIndex: 0, endIndex: borders.length - 1 })
          }
        >
          Zaznacz wszystko
        </CustomButton>
        <CustomButton
          clear
          handleClick={() => setSelection({ startIndex: null, endIndex: null })}
        >
          Usuń zaznaczenie
        </CustomButton>
      </div>
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
