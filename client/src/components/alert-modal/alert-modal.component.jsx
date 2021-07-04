import React, { useContext, useRef } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './alert-modal.styles.scss';

const AlertModal = () => {
  const {
    uiState: { modalData },
    setUiState,
  } = useContext(AppContext);
  const type = modalData?.type;
  const text = modalData?.text;

  const titleMap = {
    error: 'Błąd',
    authError: 'Błąd logowania',
    info: 'Informacja',
  };

  const handleClick = e => {
    if (e.target !== mainRef.current) setUiState({ type: 'HIDE_MODAL' });
  };

  const mainRef = useRef(null);

  return (
    <div className="modal" onClick={handleClick} data-test="alert-modal">
      <div ref={mainRef} className="modal__main">
        <h3 className="modal__title">{titleMap[type]}</h3>
        <p className="modal__text">{text}</p>
        <CustomButton handleClick={() => setUiState({ type: 'HIDE_MODAL' })}>Zamknij</CustomButton>
      </div>
    </div>
  );
};

export default AlertModal;
