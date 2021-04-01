import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Spinner from '../spinner/spinner.component';
import ErrorMessage from '../error-message/error-message.component';

import { AppContext } from '../../hooks/useAppState';

import './sign-up.styles.scss';

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setAuthError('Hasła nie są takie same.');
      return;
    }

    setUserLoading(true);

    axios
      .post('/api/auth/signup', user)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        setCurrentUser(res.data.data.user);
        setToken(res.data.data.token);
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
        setAuthError(err.response.data.error);
      });
  };

  useEffect(() => () => setAuthError(null), []);

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="sign-up">
      <h3 className="sign-up__title">Zarejestruj się</h3>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <div className="sign-up__inputs-wrapper">
          {authError && <ErrorMessage error={authError} />}
          <CustomInput
            name="name"
            label="Imię i nazwisko"
            value={user.name}
            handleChange={handleChange}
          />
          <CustomInput
            name="email"
            label="Email"
            value={user.email}
            handleChange={handleChange}
          />
          <CustomInput
            name="password"
            label="Hasło"
            type="password"
            value={user.password}
            handleChange={handleChange}
          />
          <CustomInput
            name="confirmPassword"
            label=" Powtórz hasło"
            type="password"
            value={user.confirmPassword}
            handleChange={handleChange}
          />
        </div>
        <div className="sign-up__button-wrapper">
          <CustomButton>Zarejestruj</CustomButton>
        </div>
        <div className="sign-up__spinner-wrapper">
          <Spinner isLoading={userLoading} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
