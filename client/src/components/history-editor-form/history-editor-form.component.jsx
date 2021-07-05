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
    userState: { currentUser },
    dataState: { historyList, isSortedDesc, editedItem },
    setUserState,
    setDataState,
    setGeneralState,
  } = useContext(AppContext);

  const { type, from, to, name, time, date, timestamp, i, _id } = editedItem;
  const borderFields = { type, from, to, name, time, date, timestamp, _id };

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
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });
      const userId = currentUser._id;
      const borderId = editedItem._id;

      axios
        .put(`/api/users/${userId}/borders/${borderId}`, updatedBorderPass, getConfig())
        .then(res => {
          setUserState({ type: 'SET_USER', payload: res.data.data });
          setError(null);
        })
        .catch(err => setError(err?.response?.data.error || 'Coś poszło nie tak spróbuj ponownie.'))
        .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
    } else {
      const { time, date } = updatedBorderPass;
      if (!validateTimeAndDateSync(time, date, setError)) return;

      historyList[i] = updatedBorderPass;
      const sortedHistoryList = sortHistoryListByTimeAndDate(
        historyList,
        !isSortedDesc,
        'timestamp'
      );
      setDataState({ type: 'SET_HISTORY_LIST', payload: [...sortedHistoryList] });
    }
  };

  return (
    <div className="history-editor-form" data-test="editor-form">
      {error && <ErrorMessage error={error} />}
      <form id="editor-form" onSubmit={handleSubmit} className="history-editor-form__form">
        <div className="history-editor-form__block">
          <span className="history-editor-form__nr">{i + 1}. </span>
          {(fields.type === 'tripStart' || fields.type === 'tripEnd') && (
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
                  data-test="input-from"
                />
                &#8594;
                <CustomInput
                  type="text"
                  handleChange={handleChange}
                  name="to"
                  maxLength="3"
                  autoComplete="off"
                  value={fields.to}
                  data-test="input-to"
                />
              </fieldset>
            </div>
          )}
          {fields.type === 'place' && (
            <div className="history-editor-form__country">
              <fieldset className="history-editor-form__input-wrapper place">
                <CustomInput
                  type="text"
                  handleChange={handleChange}
                  name="name"
                  maxLength="15"
                  autoComplete="off"
                  value={fields.name}
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
              data-test="input-time"
            />
            &nbsp;
            <CustomInput
              type="text"
              handleChange={handleChange}
              name="date"
              maxLength="10"
              autoComplete="off"
              value={fields.date}
              data-test="input-date"
            />
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default HistoryEditorForm;
