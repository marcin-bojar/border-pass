import React, { useContext, useEffect } from 'react';

import HistoryList from '../history-list/history-list.component';
import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './send-borders.styles.scss';

const SendBorders = () => {
  const { borders, setSendMode, selection, setSelection } = useContext(
    AppContext
  );
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

  return (
    <div className="send-borders">
      <h2 className="send-borders__title">Wysyłanie zestawienia</h2>
      <div className="send-borders__button-wrapper">
        <CustomButton>Wyślij i archiwizuj</CustomButton>
        <CustomButton>Archiwizuj</CustomButton>
      </div>
      <HistoryList />
    </div>
  );
};

export default SendBorders;
