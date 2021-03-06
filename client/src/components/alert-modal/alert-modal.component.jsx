import React, { useContext, useRef } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './alert-modal.styles.scss';

const AlertModal = () => {
  const { modalData, setShowModal } = useContext(AppContext);
  const type = modalData?.type;
  const text = modalData?.text;

  const titleMap = {
    error: 'Błąd',
    authError: 'Błąd logowania',
    info: 'Informacja',
  };

  const handleClick = e => {
    if (e.target !== mainRef.current) setShowModal(false);
  };

  const mainRef = useRef(null);

  return (
    <div className="modal" onClick={handleClick}>
      <div ref={mainRef} className="modal__main">
        <h3 className="modal__title">{titleMap[type]}</h3>
        <div className="modal__text">{text}</div>
        <CustomButton handleClick={() => setShowModal(false)}>
          Zamknij
        </CustomButton>
      </div>
    </div>
  );
};

export default AlertModal;
