import React, { useContext, useEffect } from 'react';

import HistoryList from '../history-list/history-list.component';
import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './send-borders.styles.scss';

const SendBorders = () => {
  const { setSendMode } = useContext(AppContext);

  useEffect(() => {
    setSendMode(true);
    return () => setSendMode(false);
  }, []);

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
