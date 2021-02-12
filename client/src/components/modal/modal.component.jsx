import React, { useContext } from 'react';

import AlertModal from '../alert-modal/alert-modal.component';

import { AppContext } from '../../hooks/useAppState';

const Modal = () => {
  const { showModal, modalData } = useContext(AppContext);
  const type = modalData ? modalData.type : null;

  if (!showModal) return null;

  if (type === 'error' || type === 'authError') return <AlertModal />;
};

export default Modal;
