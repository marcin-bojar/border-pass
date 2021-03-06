import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './confirm-modal.styles.scss';

const ConfirmModal = () => {
  const { modalData, setShowModal } = useContext(AppContext);
  const text = modalData?.text;
  const onConfirm = modalData?.onConfirm;

  return (
    <div className="modal">
      <div className="modal__main">
        <h3 className="modal__title">Potwierdź</h3>
        <div className="modal__text">{text}</div>
        <div className="modal__button-wrapper">
          <CustomButton handleClick={() => setShowModal(false)}>
            Anuluj
          </CustomButton>

          <CustomButton
            clear
            handleClick={() => {
              onConfirm();
              setShowModal(false);
            }}
          >
            Kontynuuj
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
