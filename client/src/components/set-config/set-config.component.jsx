import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Loader from '../loader/loader.component';
import Switch from '../switch/switch.component';

import { AppContext } from '../../hooks/useAppState';
import { getConfig } from '../../utils';

import './set-config.styles.scss';

const SetConfig = () => {
  const {
    userState: { currentUser, userLoading },
    generalState: { isMakingApiCall },
    uiState: { showPlaces },
    setUserState,
    setUiState,
    setGeneralState,
  } = useContext(AppContext);
  const [companyDetails, setCompanyDetails] = useState({
    companyEmail: '',
    companyName: '',
  });
  const [userName, setUserName] = useState('');
  const [userPreferences, setUserPreferences] = useState({
    showPlaces,
  });
  const [isCompanyUpdated, setIsCompanyUpdated] = useState(false);
  const [isUserNameUpdated, setIsUserNameUpdated] = useState(false);
  const [isUserPreferencesUpdated, setIsUserPreferencesUpdated] = useState(false);

  const handleUserNameChange = e => {
    const value = e.target.value;
    setUserName(value);
  };

  const handleCompanyDataChange = e => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleUserPreferencesChange = e => {
    const { name } = e.target;
    setUserPreferences({ ...userPreferences, [name]: e.target.checked });
  };

  const submitCompanyData = e => {
    e.preventDefault();
    const { _id } = currentUser;

    setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

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
      .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
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

    setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

    axios
      .post(`/api/users/${_id}/name`, { name: userName }, getConfig())
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
      .finally(() => setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: false }));
  };

  const submitUserPreferences = e => {
    e.preventDefault();
    const { _id } = currentUser;

    setGeneralState({ type: 'SET_IS_MAKING_API_CALL', payload: true });

    axios
      .post(`/api/users/${_id}/preferences`, userPreferences, getConfig())
      .then(res => {
        setUserState({ type: 'SET_USER', payload: res.data.data });
        setUiState({
          type: 'SET_MODAL_DATA',
          payload: { type: 'info', text: 'Twoje preferencje zostały zmienione.' },
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
      setCompanyDetails({
        ...currentUser.company,
      });
      setUserName(currentUser.name);
      setIsUserNameUpdated(userName !== currentUser.name);
      setUserPreferences(currentUser.preferences);
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

  useEffect(() => {
    setIsUserPreferencesUpdated(userPreferences.showPlaces !== showPlaces);
  }, [userPreferences, showPlaces]);

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
            data-test="input-username"
            handleChange={handleUserNameChange}
          />
          <CustomButton
            disabled={isMakingApiCall || !isUserNameUpdated}
            type="submit"
            data-test="save-user"
          >
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
            data-test="input-company-name"
            handleChange={handleCompanyDataChange}
          />
          <CustomInput
            value={companyDetails.companyEmail}
            name="companyEmail"
            label="Adres Email"
            data-test="input-company-email"
            handleChange={handleCompanyDataChange}
          />
          <CustomButton
            disabled={isMakingApiCall || !isCompanyUpdated}
            type="submit"
            data-test="save-company"
          >
            Zapisz
          </CustomButton>
        </form>
      </section>
      <section className="set-config__section">
        <h3 className="set-config__section-title">Twoje ustawienia</h3>
        <form onSubmit={submitUserPreferences} className="set-config__form">
          <Switch
            id="showPlaces"
            name="showPlaces"
            label="Pokazuj punkty na trasie"
            handleChange={handleUserPreferencesChange}
            isOn={userPreferences.showPlaces}
          />
          <CustomButton
            disabled={isMakingApiCall || !isUserPreferencesUpdated}
            type="submit"
            data-test="save-preferences"
          >
            Zapisz
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export default SetConfig;
