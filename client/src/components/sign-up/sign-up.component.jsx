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
  const {
    userState: { currentUser, userLoading, authError },
    setUserState,
  } = useContext(AppContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setUserState({ type: 'USER_AUTH_ERROR', payload: 'Hasła nie są takie same.' });
      return;
    }

    setUserState({ type: 'SET_USER_LOADING', payload: true });

    axios
      .post('/api/auth/signup', user)
      .then(res => {
        setUserState({
          type: 'USER_LOGIN',
          payload: { user: res.data.data.user, token: res.data.data.token },
        });
      })
      .catch(err => {
        setUserState({
          type: 'USER_AUTH_ERROR',
          payload: err?.response?.data?.error || 'Coś poszło nie tak, spróbuj ponownie.',
        });
      });
  };

  useEffect(() => () => setUserState({ type: 'CLEAR_AUTH_ERROR' }), []);

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
            aria-label="Imię i nazwisko"
            data-test="name"
            value={user.name}
            handleChange={handleChange}
          />
          <CustomInput
            name="email"
            label="Email"
            aria-label="Email"
            data-test="email"
            value={user.email}
            handleChange={handleChange}
          />
          <CustomInput
            name="password"
            label="Hasło"
            aria-label="Hasło"
            data-test="password"
            type="password"
            value={user.password}
            handleChange={handleChange}
          />
          <CustomInput
            name="confirmPassword"
            label=" Powtórz hasło"
            aria-label="Powtórz hasło"
            data-test="confirmPassword"
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
