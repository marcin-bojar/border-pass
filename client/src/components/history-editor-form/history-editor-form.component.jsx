import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { parseDate, getConfig, sortUsersBorders } from '../../utils';

import CustomInput from '../custom-input/custom-input.component';

import { AppContext } from '../../hooks/useAppState';

import './history-editor-form.styles.scss';

const HistoryEditorForm = () => {
  const {
    currentUser,
    setCurrentUser,
    editedItem,
    setEditedItem,
    borders,
    setBorders,
    isSortedDesc,
  } = useContext(AppContext);

  const { from, to, time, date, timestamp, i, _id } = editedItem;
  const borderFields = { from, to, time, date, timestamp, _id };

  const [fields, setFields] = useState(borderFields);

  //TODO Double render !!!
  useEffect(() => {
    setFields({ ...borderFields });
  }, [editedItem]);

  useEffect(() => {
    setFields({ ...fields, timestamp: timestampUpdater() });
  }, [fields.time, fields.date]);

  const handleChange = e => {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value.toUpperCase() });
  };

  const timestampUpdater = () => {
    const timestamp = parseDate(fields.time, fields.date);

    if (isNaN(timestamp)) return fields.timestamp;

    return timestamp;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedBorderPass = fields;

    if (currentUser) {
      const userId = currentUser._id;
      const borderId = editedItem._id;

      axios
        .put(
          `/api/users/${userId}/borders/${borderId}`,
          updatedBorderPass,
          getConfig()
        )
        .then(res => {
          const user = sortUsersBorders(res.data.data, isSortedDesc);
          setCurrentUser(user);
          setEditedItem(null);
        })
        .catch(err => alert('Ups... ' + err.response.data.error));
    } else {
      borders[i] = updatedBorderPass;
      setBorders([...borders]);
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
            maxLength="5"
            autoComplete="off"
            value={fields.time}
          />
          &nbsp;
          <CustomInput
            type="text"
            handleChange={handleChange}
            name="date"
            maxLength="10"
            autoComplete="off"
            value={fields.date}
          />
        </fieldset>
      </div>
    </form>
  );
};

export default HistoryEditorForm;
