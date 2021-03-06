import React, { useContext } from 'react';

import AlertModal from '../alert-modal/alert-modal.component';
import ConfirmModal from '../confirm-modal/confirm-modal.component';
import PromptModal from '../prompt-modal/prompt-modal.component';

import { AppContext } from '../../hooks/useAppState';

const Modal = () => {
  const { showModal, modalData } = useContext(AppContext);
  const type = modalData?.type;

  if (!showModal) return null;

  if (type === 'confirm') return <ConfirmModal />;
  else if (type === 'prompt') return <PromptModal />;
  else return <AlertModal />;
};

export default Modal;
