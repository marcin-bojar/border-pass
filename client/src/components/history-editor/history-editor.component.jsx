import React, { useContext, useEffect } from 'react';

import HistoryEditorForm from '../history-editor-form/history-editor-form.component';
import CustomButton from '../custom-button/custom-button.component';

import { AppContext } from '../../hooks/useAppState';

import './history-editor.styles.scss';

const HistoryEditor = () => {
  const {
    dataState: { editedItem },
    generalState: { isMakingApiCall },
    setDataState,
  } = useContext(AppContext);

  useEffect(() => {
    return () => setDataState({ type: 'SET_EDITED_ITEM', payload: null });
  }, []);

  return (
    <div className="history-editor" data-test="history-editor">
      <h3 className="history-editor__title">Edytor historii</h3>
      {!editedItem && (
        <p className="history-editor__text">
          <span>Wybierz</span> element z listy, który chcesz edytować.
        </p>
      )}
      {editedItem && (
        <div className="history-editor__editor">
          <p className="history-editor__text">Co chciałbyś zmienić?</p>

          <HistoryEditorForm />

          <CustomButton
            type="submit"
            form="editor-form"
            disabled={isMakingApiCall}
            data-test="confirm-edit"
          >
            Zatwierdź
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default HistoryEditor;
