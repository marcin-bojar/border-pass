import React, { useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './confirm-modal.styles.scss';

const ConfirmModal = () => {
  const {
    uiState: { modalData },
    setUiState,
  } = useContext(AppContext);
  const text = modalData?.text;
  const onConfirm = modalData?.onConfirm;

  return (
    <div className="modal">
      <div className="modal__main">
        <h3 className="modal__title">Potwierdź</h3>
        <div className="modal__text">{text}</div>
        <div className="modal__button-wrapper">
          <CustomButton
            setWidth="9.4rem"
            clear
            handleClick={() => setUiState({ type: 'HIDE_MODAL' })}
          >
            Anuluj
          </CustomButton>

          <CustomButton
            setWidth="9.4rem"
            handleClick={() => {
              onConfirm();
              setUiState({ type: 'HIDE_MODAL' });
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
