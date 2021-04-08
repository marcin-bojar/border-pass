import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import {
  parseDate,
  getConfig,
  validateTimeAndDateSync,
  sortHistoryListByTimeAndDate,
} from '../../utils';

import CustomInput from '../custom-input/custom-input.component';
import ErrorMessage from '../error-message/error-message.component';

import { AppContext } from '../../hooks/useAppState';

import './history-editor-form.styles.scss';

const HistoryEditorForm = () => {
  const {
    userData: { currentUser },
    setUserData,
    editedItem,
    setEditedItem,
    borders,
    setBorders,
    setIsMakingApiCall,
    isSortedDesc,
  } = useContext(AppContext);

  const { type, from, to, time, date, timestamp, i, _id } = editedItem;
  const borderFields = { type, from, to, time, date, timestamp, _id };

  const [fields, setFields] = useState(borderFields);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFields({ ...borderFields });
  }, [editedItem]);

  useEffect(() => {
    setFields({ ...fields, timestamp: parseDate(fields.time, fields.date) });
  }, [fields.time, fields.date]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value.toUpperCase() });
  };

  const handleSelectChange = e => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedBorderPass = fields;

    if (currentUser) {
      setIsMakingApiCall(true);
      const userId = currentUser._id;
      const borderId = editedItem._id;

      axios
        .put(`/api/users/${userId}/borders/${borderId}`, updatedBorderPass, getConfig())
        .then(res => {
          setUserData({ type: 'SET_USER', payload: res.data.data });
          setEditedItem(null);
        })
        .catch(err => setError(err.response.data.error))
        .finally(() => setIsMakingApiCall(false));
    } else {
      const { time, date } = updatedBorderPass;
      if (!validateTimeAndDateSync(time, date, setError)) return;

      borders[i] = updatedBorderPass;
      const sortedBorders = sortHistoryListByTimeAndDate(borders, !isSortedDesc, 'timestamp');
      setBorders([...sortedBorders]);
      setEditedItem(null);
    }
  };

  return (
    <div className="history-editor-form">
      {error && <ErrorMessage error={error} />}
      <form id="editor-form" onSubmit={handleSubmit} className="history-editor-form__form">
        <div className="history-editor-form__block">
          <span className="history-editor-form__nr">{i + 1}. </span>
          {fields.type !== 'borderPass' && (
            <div className="history-editor-form__trip-event">
              <select
                className="history-editor-form__select"
                name="type"
                value={fields.type}
                onChange={handleSelectChange}
              >
                <option value="tripStart">Wyjazd z bazy</option>
                <option value="tripEnd">Powrót na bazę</option>
              </select>
            </div>
          )}
          {fields.type === 'borderPass' && (
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
          )}
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
    </div>
  );
};

export default HistoryEditorForm;
