import React, { useContext } from 'react';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';

import {
  parseTimestamp,
  sortUsersBorders,
  sortHistoryListByTimeAndDate,
  getConfig,
} from '../../utils';
import { AppContext } from '../../hooks/useAppState';

import './trip-events.styles.scss';

const TripEvents = () => {
  const {
    borders,
    setBorders,
    currentUser,
    setCurrentUser,
    currentCountry,
    setIsMakingApiCall,
    setModalData,
    isSortedDesc,
    isMakingApiCall,
  } = useContext(AppContext);

  const onTripEvent = eventType => {
    if (!currentCountry) {
      setModalData({
        type: 'error',
        text: 'Określ najpierw kraj, w którym się znajdujesz',
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
      setIsMakingApiCall(true);
      const { _id } = currentUser;

      axios
        .post(`/api/users/${_id}/borders`, tripEvent, getConfig())
        .then(res => {
          const user = sortUsersBorders(res.data.data, isSortedDesc);
          setCurrentUser(user);
          return axios.post('/api/borders', { ...tripEvent, user: _id });
        })
        .catch(err =>
          setModalData({ type: 'error', text: err.response.data.error })
        )
        .finally(() => setIsMakingApiCall(false));
    } else {
      const updatedBorders = sortHistoryListByTimeAndDate(
        [...borders, tripEvent],
        !isSortedDesc,
        'timestamp'
      );
      setBorders(updatedBorders);
    }
  };

  return (
    <div className="trip-events">
      <h3 className="trip-events__title">Zdarzenia</h3>
      <div className="trip-events__button-wrapper">
        <CustomButton
          type="button"
          disabled={isMakingApiCall}
          handleClick={() => onTripEvent('tripStart')}
        >
          Wyjazd z bazy
        </CustomButton>
        <CustomButton
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
