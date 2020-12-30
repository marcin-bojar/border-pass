import React, { useState, useEffect, useContext } from 'react';

import CustomInput from '../custom-input/custom-input.component';

import './history-editor-form.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const HistoryEditorForm = () => {
  const {
    editedItem,
    borders,
    setBorders,
    currentCountry,
    setCurrentCountry,
  } = useContext(AppContext);
  const { from, to, time, date, i } = editedItem;
  const state = { from, to, time, date };

  const [fields, setFields] = useState(state);

  //TODO Double render !!!
  useEffect(() => {
    setFields({ ...state });
  }, [editedItem]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value.toUpperCase() });
  };

  const handleSubmit = e => {
    e.preventDefault();

    borders[i] = fields;
    setBorders([...borders]);

    // If last item in the history is being edited make sure the current's country value is up to date
    const lastItem = i === borders.length - 1;
    const notUpToDate = borders[i] !== currentCountry;

    if (lastItem && notUpToDate) {
      setCurrentCountry(borders[i].to);
    }
  };

  return (
    <form id="form" onSubmit={handleSubmit} className="history-editor-form">
      <div className="history-editor-form__block">
        <span className="history-editor-form__nr">{i + 1}. </span>
        <div className="history-editor-form__country">
          <fieldset className="history-editor-form__input-wrapper country">
            <CustomInput
              type="text"
              handleChange={handleChange}
              name="from"
              maxLength="3"
              autoComplete="off"
              value={fields.from}
            />
            &#8594;
            <CustomInput
              type="text"
              handleChange={handleChange}
              name="to"
              maxLength="3"
              autoComplete="off"
              value={fields.to}
            />
          </fieldset>
        </div>
      </div>
      <div className="history-editor-form__block">
        <fieldset className="history-editor-form__input-wrapper time">
          <CustomInput
            type="text"
            handleChange={handleChange}
            name="time"
            autoComplete="off"
            value={fields.time}
          />
          &nbsp;
          <CustomInput
            type="text"
            handleChange={handleChange}
            name="date"
            autoComplete="off"
            value={fields.date}
          />
        </fieldset>
      </div>
    </form>
  );
};

export default HistoryEditorForm;
