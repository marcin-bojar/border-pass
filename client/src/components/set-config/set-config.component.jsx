import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Loader from '../loader/loader.component';

import { AppContext } from '../../hooks/useAppState';
import { getConfig } from '../../utils';

import './set-config.styles.scss';

const SetConfig = () => {
  const {
    userState: { currentUser, userLoading },
    setUserState,
    setUiState,
    isMakingApiCall,
    setIsMakingApiCall,
  } = useContext(AppContext);
  const [companyDetails, setCompanyDetails] = useState({
    companyEmail: '',
    companyName: '',
  });
  const [userName, setUserName] = useState('');
  const [isCompanyUpdated, setIsCompanyUpdated] = useState(false);
  const [isUserNameUpdated, setIsUserNameUpdated] = useState(false);

  const handleUserNameChange = e => {
    const value = e.target.value;
    setUserName(value);
  };

  const handleCompanyDataChange = e => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const submitCompanyData = e => {
    e.preventDefault();
    const { _id } = currentUser;

    setIsMakingApiCall(true);

    axios
      .post(`/api/users/${_id}/company`, companyDetails, getConfig())
      .then(res => {
        setUserState({ type: 'SET_USER', payload: res.data.data });
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: { type: 'info', text: 'Dane firmy zostały zmienione.' },
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
      .finally(() => setIsMakingApiCall(false));
  };

  const submitUserName = e => {
    e.preventDefault();

    if (!userName) {
      setUiState({
        type: 'SET_MODAL_DATA',
        payload: { type: 'error', text: 'Nie podałeś imienia i nazwiska.' },
      });
      setUserName(currentUser?.name);
      return;
    }

    const { _id } = currentUser;

    setIsMakingApiCall(true);

    axios
      .post(`/api/users/${_id}/name`, { userName }, getConfig())
      .then(res => {
        setUserState({ type: 'SET_USER', payload: res.data.data });
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'info',
            text: 'Twoje imię i nazwisko zostały zmienione.',
          },
        });
      })
      .catch(err =>
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: {
            type: 'error',
            text: err?.response?.data.error || 'Coś poszło nie tak, spróbuj ponownie.',
          },
        })
      )
      .finally(() => setIsMakingApiCall(false));
  };

  useEffect(() => {
    if (currentUser) {
      setCompanyDetails({
        companyEmail: currentUser.company.companyEmail,
        companyName: currentUser.company.companyName,
      });
      setUserName(currentUser.name);
      setIsUserNameUpdated(userName !== currentUser.name);
    }
  }, [currentUser]);

  useEffect(() => {
    setIsCompanyUpdated(
      companyDetails.companyEmail !== currentUser?.company.companyEmail ||
        companyDetails.companyName !== currentUser?.company.companyName
    );
  }, [companyDetails]);

  useEffect(() => {
    setIsUserNameUpdated(userName !== currentUser?.name);
  }, [userName]);

  if (userLoading) return <Loader />;
  else if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="set-config">
      <h2 className="set-config__title">Ustawienia</h2>
      <section className="set-config__section">
        <h3 className="set-config__section-title">Twoje dane</h3>
        <form onSubmit={submitUserName} className="set-config__form">
          <CustomInput
            value={userName}
            name="userName"
            label="Imię i nazwisko"
            handleChange={handleUserNameChange}
          />
          <CustomButton disabled={isMakingApiCall || !isUserNameUpdated} type="submit">
            Zapisz
          </CustomButton>
        </form>
      </section>
      <section className="set-config__section">
        <h3 className="set-config__section-title">Dane Twojej Firmy</h3>
        <form onSubmit={submitCompanyData} className="set-config__form">
          <CustomInput
            value={companyDetails.companyName}
            name="companyName"
            label="Nazwa Firmy"
            handleChange={handleCompanyDataChange}
          />
          <CustomInput
            value={companyDetails.companyEmail}
            name="companyEmail"
            label="Adres Email"
            handleChange={handleCompanyDataChange}
          />
          <CustomButton disabled={isMakingApiCall || !isCompanyUpdated} type="submit">
            Zapisz
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export default SetConfig;
