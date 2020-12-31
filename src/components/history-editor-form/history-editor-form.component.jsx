import React, { useState, useEffect, useContext } from 'react';

import { parseTimestamp, sortASC, sortDESC } from '../../utils';

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
    isSortedDesc,
  } = useContext(AppContext);
  const { from, to, time, date, timestamp, i } = editedItem;
  const state = { from, to, time, date, timestamp };

  const [fields, setFields] = useState(state);

  //TODO Double render !!!
  useEffect(() => {
    setFields({ ...state });
  }, [editedItem]);

  useEffect(() => {
    setFields({ ...fields, timestamp: timestampUpdater() });
  }, [fields.time, fields.date]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value.toUpperCase() });
  };

  const timestampUpdater = () => {
    const timestamp = parseTimestamp(fields.time, fields.date);

    if (isNaN(timestamp)) {
      return fields.timestamp;
    }

    return timestamp;
  };

  const handleSubmit = e => {
    e.preventDefault();

    borders[i] = fields;
    let sortedBorders;
    if (isSortedDesc) sortedBorders = sortDESC(borders);
    else sortedBorders = sortASC(borders);

    setBorders([...sortedBorders]);

    // If last item in the history is being edited make sure the current's country value is up to date
    const lastIndex = borders.length - 1;
    const lastItem = i === lastIndex;
    const notUpToDate = borders[lastIndex].to !== currentCountry;

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
