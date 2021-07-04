import React, { useContext, useRef, useEffect } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';

import { AppContext } from '../../hooks/useAppState';
import useSingleInput from '../../hooks/useSingleInput';

import './prompt-modal.styles.scss';

const PromptModal = () => {
  const {
    uiState: { modalData },
    setUiState,
  } = useContext(AppContext);
  const { inputValue, handleChange } = useSingleInput();
  const text = modalData?.text;
  const expectedValue = modalData?.expectedValue;
  const onConfirm = modalData?.onConfirm;
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue === expectedValue) {
      onConfirm();
      setUiState({ type: 'HIDE_MODAL' });
    } else setUiState({ type: 'HIDE_MODAL' });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="modal">
      <div className="modal__main">
        <h3 className="modal__title">Potwierdź</h3>
        <p className="modal__text">{text}</p>
        <form className="modal__form" id="prompt-form" onSubmit={handleSubmit}>
          <CustomInput ref={inputRef} type="text" value={inputValue} handleChange={handleChange} />
        </form>

        <div className="modal__button-wrapper">
          <CustomButton
            setWidth="7.1rem"
            clear
            type="button"
            handleClick={() => setUiState({ type: 'HIDE_MODAL' })}
          >
            Anuluj
          </CustomButton>

          <CustomButton setWidth="7.1rem" type="submit" form="prompt-form">
            OK
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
