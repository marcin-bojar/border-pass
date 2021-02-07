import React, { useContext, useEffect, useRef } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './modal.styles.scss';

const Modal = () => {
  const { showModal, setShowModal, modalData } = useContext(AppContext);
  const type = modalData ? modalData.type : null;
  const text = modalData ? modalData.text : null;

  const titleMap = {
    error: 'Błąd',
    authError: 'Błąd logowania',
  };

  const handleClick = e => {
    if (e.target !== mainRef.current) setShowModal(false);
  };

  const mainRef = useRef(null);

  useEffect(() => {});

  if (!showModal) return null;

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

export default Modal;
