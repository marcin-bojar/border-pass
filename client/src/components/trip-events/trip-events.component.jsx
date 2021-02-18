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

const DelegationEvents = () => {
  const {
    borders,
    setBorders,
    currentUser,
    setCurrentUser,
    setIsMakingApiCall,
    setModalData,
    isSortedDesc,
  } = useContext(AppContext);

  const onTripEvent = eventType => {
    const timestamp = Date.now();
    const { time, date } = parseTimestamp(timestamp);

    const delegationEvent = {
      type: eventType,
      time,
      date,
    };

    if (currentUser) {
      setIsMakingApiCall(true);
      const { _id } = currentUser;

      axios
        .post(`/api/users/${_id}/borders`, delegationEvent, getConfig())
        .then(res => {
          const user = sortUsersBorders(res.data.data, isSortedDesc);
          setCurrentUser(user);
          return axios.post('/api/borders', { ...delegationEvent, user: _id });
        })
        .catch(err =>
          setModalData({ type: 'error', text: err.response.data.error })
        )
        .finally(() => setIsMakingApiCall(false));
    } else {
      const updatedBorders = sortHistoryListByTimeAndDate(
        [...borders, delegationEvent],
        isSortedDesc,
        'timestamp'
      );
      setBorders(updatedBorders);
    }
  };

  return (
    <div className="trip-events">
      <div className="trip-events__button-wrapper">
        <CustomButton
          type="button"
          handleClick={() => onTripEvent('delegationStart')}
        >
          Wyjazd z bazy
        </CustomButton>
        <CustomButton
          type="button"
          handleClick={() => onTripEvent('delegationEnd')}
        >
          Powrót na bazę
        </CustomButton>
      </div>
    </div>
  );
};

export default DelegationEvents;
