import React, { useContext, useEffect } from 'react';

import HistoryEditorForm from '../history-editor-form/history-editor-form.component';
import CustomButton from '../custom-button/custom-button.component';

import './history-editor.styles.scss';

import { AppContext } from '../../hooks/useAppState';

const HistoryEditor = () => {
  const { editedItem, setEditedItem } = useContext(AppContext);

  useEffect(() => {
    return () => setEditedItem(null);
  }, []);

  return (
    <div className="history-editor">
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

          <CustomButton type="submit" form="form">
            Zatwierdź
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default HistoryEditor;
