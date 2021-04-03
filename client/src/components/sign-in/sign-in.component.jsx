import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Spinner from '../spinner/spinner.component';
import ErrorMessage from '../error-message/error-message.component';

import { AppContext } from '../../hooks/useAppState';

import './sign-in.styles.scss';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const {
    currentUser,
    setCurrentUser,
    setGuestUser,
    setToken,
    userLoading,
    setUserLoading,
    authError,
    setAuthError,
  } = useContext(AppContext);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUserLoading(true);

    axios
      .post('/api/auth/signin', userCredentials)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        setToken(res.data.data.token);
        setCurrentUser(res.data.data.user);
        setGuestUser(false);
        setUserLoading(false);
        setAuthError(null);
      })
      .catch(err => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        setToken(null);
        setUserLoading(false);
        setGuestUser(false);
        if (err?.response?.status === 401 || err?.response?.status === 404)
          setAuthError('Podane dane są nieprawidłowe.');
        else setAuthError(err.response.data.error);
      });
  };

  useEffect(() => () => setAuthError(null), []);

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="sign-in">
      <h3 className="sign-in__title">Zaloguj się</h3>
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__inputs-wrapper">
          {authError && <ErrorMessage error={authError} />}
          <CustomInput
            name="email"
            label="Email"
            value={userCredentials.email}
            handleChange={handleChange}
          />
          <CustomInput
            name="password"
            label="Hasło"
            type="password"
            value={userCredentials.password}
            handleChange={handleChange}
          />
        </div>
        <div className="sign-in__button-wrapper">
          <CustomButton>Zaloguj</CustomButton>
        </div>
        <div className="sign-in__spinner-wrapper">
          <Spinner isLoading={userLoading} />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
