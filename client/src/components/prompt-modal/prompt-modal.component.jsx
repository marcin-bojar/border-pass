import React, { useContext, useRef, useEffect } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';

import { AppContext } from '../../hooks/useAppState';
import useSingleInput from '../../hooks/useSingleInput';

import './prompt-modal.styles.scss';

const PromptModal = () => {
  const { modalData, setShowModal } = useContext(AppContext);
  const { inputValue, handleChange } = useSingleInput();
  const text = modalData ? modalData.text : null;
  const expectedValue = modalData ? modalData.expectedValue : null;
  const onConfirm = modalData ? modalData.onConfirm : null;
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue === expectedValue) {
      onConfirm();
      setShowModal(false);
    } else setShowModal(false);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="modal">
      <div className="modal__main">
        <h3 className="modal__title">Potwierdź</h3>
        <div className="modal__text">{text}</div>
        <form className="modal__form" id="prompt-form" onSubmit={handleSubmit}>
          <CustomInput
            ref={inputRef}
            type="text"
            value={inputValue}
            handleChange={handleChange}
          />
        </form>

        <div className="modal__button-wrapper">
          <CustomButton type="button" handleClick={() => setShowModal(false)}>
            Anuluj
          </CustomButton>

          <CustomButton type="submit" form="prompt-form" clear>
            OK
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
