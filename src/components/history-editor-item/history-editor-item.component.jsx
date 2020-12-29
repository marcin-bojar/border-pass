import React, { useContext } from 'react';

import CustomInput from '../custom-input/custom-input.component';

import './history-editor-item.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const HistoryEditorItem = () => {
  const { editedItem } = useContext(AppContext);
  const { from, to, timeAndDate, i } = editedItem;
  const { time, date } = timeAndDate;

  return (
    <div className="history-editor-item">
      <div className="history-editor-item__block">
        <span className="history-editor-item__nr">{i + 1}. </span>
        <div className="history-editor-item__country">
          <fieldset className="history-editor-item__input-wrapper country">
            <CustomInput maxLength="3" initialValue={from} />
            &#8594;
            <CustomInput maxLength="3" initialValue={to} />
          </fieldset>
        </div>
      </div>
      <div className="history-editor-item__block">
        <fieldset className="history-editor-item__input-wrapper time">
          <CustomInput initialValue={time} />
          &nbsp;
          <CustomInput initialValue={date} />
        </fieldset>
      </div>
    </div>
  );
};

export default HistoryEditorItem;
