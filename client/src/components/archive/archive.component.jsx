import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Loader from '../loader/loader.component';
import ArchiveList from '../archive-list/archive-list.compontent';
import CustomButton from '../custom-button/custom-button.component';

import { getConfig } from '../../utils';
import { AppContext } from '../../hooks/useAppState';
import { filterReducer, FILTER_INITIAL_STATE } from '../../reducers/filterReducer';

import './archive.styles.scss';

const Archive = () => {
  const {
    userState: { currentUser },
    generalState: { isMakingApiCall },
    setUiState,
    setGeneralState,
  } = useContext(AppContext);
  const [archives, setArchives] = useState([]);
  const [filterState, setFilterState] = useReducer(filterReducer, FILTER_INITIAL_STATE);

  useEffect(() => {
    if (currentUser) {
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

      axios
        .get('/api/tables', getConfig())
        .then(res => {
          setArchives([...res.data.data]);
        })
        .catch(err =>
          setUiState({
            type: 'SET_MODAL_DATA',
            payload: {
              type: 'error',
              text: err?.response?.data.error || 'Coś poszło nie tak spróbuj ponownie.',
            },
          })
        )
        .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
    }
  }, []);

  useEffect(() => console.log(archives), [archives]);

  if (isMakingApiCall) return <Loader />;
  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="archive">
      <h2 className="archive__title">Twoje archiwum</h2>
      <div className="archive__filters">
        <CustomButton
          active={filterState.all}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_ALL' })}
        >
          Wszystkie
        </CustomButton>
        <CustomButton
          active={filterState.archived}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_ARCHIVED' })}
        >
          Nie wysłane
        </CustomButton>
        <CustomButton
          active={filterState.sent}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_SENT' })}
        >
          Wysłane
        </CustomButton>
      </div>
      <ArchiveList list={archives} />
    </div>
  );
};

export default Archive;
