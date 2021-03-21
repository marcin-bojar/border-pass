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
    currentUser,
    setCurrentUser,
    userLoading,
    isMakingApiCall,
    setIsMakingApiCall,
    setModalData,
  } = useContext(AppContext);
  const [companyDetails, setCompanyDetails] = useState({
    companyEmail: '',
    companyName: '',
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { _id } = currentUser;

    setIsMakingApiCall(true);

    axios
      .post(`/api/users/${_id}/company`, companyDetails, getConfig())
      .then(res => {
        setCurrentUser(res.data.data);
        setModalData({ type: 'info', text: 'Dane firmy zostały zmienione.' });
      })
      .catch(err =>
        setModalData({ type: 'error', text: err.response.data.error })
      )

      .finally(() => setIsMakingApiCall(false));
  };

  useEffect(() => {
    if (currentUser)
      setCompanyDetails({
        companyEmail: currentUser.company.companyEmail,
        companyName: currentUser.company.companyName,
      });
  }, [currentUser]);

  useEffect(() => {
    setIsUpdated(
      companyDetails.companyEmail !== currentUser?.company.companyEmail ||
        companyDetails.companyName !== currentUser?.company.companyName
    );
  }, [companyDetails]);

  if (userLoading) return <Loader />;
  else if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="set-config">
      <h2 className="set-config__title">Ustawienia</h2>
      <div className="set-config__section">
        <h3 className="set-config__section-title">Dane Twojej Firmy</h3>
        <form onSubmit={handleSubmit} className="set-config__form">
          <CustomInput
            value={companyDetails.companyName}
            name="companyName"
            label="Nazwa Firmy"
            handleChange={handleChange}
          />
          <CustomInput
            value={companyDetails.companyEmail}
            name="companyEmail"
            label="Adres Email"
            handleChange={handleChange}
          />
          <CustomButton disabled={isMakingApiCall || !isUpdated} type="submit">
            Zapisz
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default SetConfig;
