import React, { useContext } from 'react';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

import { parseTimestamp, sortHistoryListByTimeAndDate, getConfig } from '../../utils';
import { AppContext } from '../../hooks/useAppState';

import './trip-events.styles.scss';

const TripEvents = () => {
  const {
    userState: { currentUser },
    dataState: { historyList, currentCountry, isSortedDesc },
    generalState: { isMakingApiCall },
    setUserState,
    setDataState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);

  const onTripEvent = eventType => {
    if (!currentCountry) {
      setUiState({
        type: 'SET_MODAL_DATA',
        payload: {
          type: 'error',
          text: 'Określ najpierw kraj, w którym się znajdujesz',
        },
      });
      return;
    }

    const timestamp = Date.now();
    const { time, date } = parseTimestamp(timestamp);

    const tripEvent = {
      type: eventType,
      to: currentCountry,
      time,
      date,
      timestamp,
    };

    if (currentUser) {
      setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });
      const { _id } = currentUser;

      axios
        .post(`/api/users/${_id}/borders`, tripEvent, getConfig())
        .then(res => setUserState({ type: 'SET_USER', payload: res.data.data }))
        .catch(err =>
          setUiState({
            type: 'SET_MODAL_DATA',
            payload: {
              type: 'error',
              text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
            },
          })
        )
        .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
    } else {
      const updatedHistoryList = sortHistoryListByTimeAndDate(
        [...historyList, tripEvent],
        !isSortedDesc,
        'timestamp'
      );
      setDataState({ type: 'SET_HISTORY_LIST', payload: updatedHistoryList });
    }
  };

  if (!currentCountry) return null;

  return (
    <div className="trip-events">
      <h3 className="trip-events__title">Zdarzenia</h3>
      <div className="trip-events__button-wrapper">
        <CustomButton
          setWidth="13rem"
          type="button"
          disabled={isMakingApiCall}
          handleClick={() => onTripEvent('tripStart')}
        >
          Wyjazd z bazy
        </CustomButton>
        <Spinner isLoading={isMakingApiCall} />
        <CustomButton
          setWidth="13rem"
          type="button"
          disabled={isMakingApiCall}
          handleClick={() => onTripEvent('tripEnd')}
        >
          Powrót na bazę
        </CustomButton>
      </div>
    </div>
  );
};

export default TripEvents;
