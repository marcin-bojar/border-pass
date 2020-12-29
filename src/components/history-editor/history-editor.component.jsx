import React, { useContext, useEffect } from 'react';

import HistoryEditorItem from '../history-editor-item/history-editor-item.component';
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
      <p className="history-editor__text">
        Wybierz element z listy, który chcesz edytować.
      </p>
      {editedItem && (
        <div className="history-editor__editor">
          <HistoryEditorItem />
          <CustomButton>Zatwierdź</CustomButton>
        </div>
      )}
    </div>
  );
};

export default HistoryEditor;
