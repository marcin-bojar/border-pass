import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import Loader from '../loader/loader.component';
import ArchiveList from '../archive-list/archive-list.compontent';
import CustomButton from '../custom-button/custom-button.component';

import { getConfig } from '../../utils';
import { AppContext } from '../../hooks/useAppState';
import { filterReducer, FILTER_INITIAL_STATE } from '../../reducers/filterReducer';

import './archive.styles.scss';

const Archive = ({ history }) => {
  const {
    dataState: { selectedArchive },
    userState: { currentUser },
    generalState: { isMakingApiCall },
    setDataState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);
  const [archives, setArchives] = useState([]);
  const [allArchives, setAllArchives] = useState(null);
  const [filterState, setFilterState] = useReducer(filterReducer, FILTER_INITIAL_STATE);

  const deleteArchiveItem = () => {
    setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });
    const { _id } = selectedArchive;

    axios
      .delete(`/api/tables/${_id}`, getConfig())
      .then(res => {
        const updatedArchives = archives.filter(el => el._id !== res.data.data._id);
        setArchives(updatedArchives);
        setAllArchives(updatedArchives);
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'info',
            text: 'Element został usunięty z archiwum.',
          },
        });
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
  };

  useEffect(() => {
    if (currentUser) {
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

      axios
        .get('/api/tables', getConfig())
        .then(res => {
          setArchives([...res.data.data]);
          setAllArchives(res.data.data);
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

  useEffect(() => {
    if (allArchives) {
      if (filterState.showAll) setArchives(allArchives);
      else if (filterState.showArchived)
        setArchives(allArchives.filter(el => el.status === 'archived'));
      else setArchives(allArchives.filter(el => el.status === 'sent'));
    }
  }, [filterState]);

  if (isMakingApiCall) return <Loader />;
  if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="archive">
      <h2 className="archive__title">Twoje archiwum</h2>
      <div className="archive__filters">
        <CustomButton
          active={filterState.showAll}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_ALL' })}
        >
          Wszystkie
        </CustomButton>
        <CustomButton
          active={filterState.showArchived}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_ARCHIVED' })}
        >
          Nie wysłane
        </CustomButton>
        <CustomButton
          active={filterState.showSent}
          inline
          handleClick={() => setFilterState({ type: 'SHOW_SENT' })}
        >
          Wysłane
        </CustomButton>
      </div>
      {selectedArchive && (
        <div className="archive__options">
          <CustomButton
            disabled={selectedArchive.status === 'sent' || isMakingApiCall}
            handleClick={() => {
              history.push('/send', selectedArchive.borders);
            }}
          >
            Wyślij
          </CustomButton>
          <CustomButton
            clear
            disabled={isMakingApiCall}
            handleClick={() =>
              setUiState({
                type: 'SET_MODAL_DATA',
                payload: {
                  type: 'confirm',
                  text: 'Usuwasz wybrany element z listy. Czy chcesz kontynuować?',
                  onConfirm: deleteArchiveItem,
                },
              })
            }
          >
            Usuń
          </CustomButton>
        </div>
      )}
      {!archives.length ? (
        <div className="archive__info">
          <p>Nic tu jeszcze nie masz.</p>
        </div>
      ) : (
        <ArchiveList list={archives} />
      )}
    </div>
  );
};

export default withRouter(Archive);
