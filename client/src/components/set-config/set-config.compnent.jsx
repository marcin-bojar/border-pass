import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Loader from '../loader/loader.component';

import { AppContext } from '../../hooks/useAppState';

import './set-config.styles.scss';

const SetConfig = () => {
  const { currentUser, userLoading } = useContext(AppContext);
  const [config, setConfig] = useState({
    email: currentUser?.config?.email,
    company: currentUser?.company,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  if (userLoading) return <Loader />;
  else if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="set-config">
      <h2 className="set-config__title">Ustawienia</h2>
      <div className="set-config__section">
        <div className="h3 set-config__section-title">Dane Twojej Firmy</div>
        <div className="set-config__block">
          <CustomInput
            value={config.company}
            name="company"
            label="Nazwa Firmy"
            handleChange={handleChange}
          />
          <CustomButton>Zmień</CustomButton>
        </div>
        <div className="set-config__block">
          <CustomInput
            value={config.email}
            name="email"
            label="Adres Email"
            handleChange={handleChange}
          />
          <CustomButton>Zmień</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SetConfig;
