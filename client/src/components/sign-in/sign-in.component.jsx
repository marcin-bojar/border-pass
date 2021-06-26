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
  const {
    userState: { currentUser, userLoading, authError },
    setUserState,
  } = useContext(AppContext);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUserState({ type: 'SET_USER_LOADING', payload: true });

    axios
      .post('/api/auth/signin', userCredentials)
      .then(res => {
        setUserState({
          type: 'USER_LOGIN',
          payload: { user: res.data.data.user, token: res.data.data.token },
        });
      })
      .catch(err =>
        setUserState({
          type: 'USER_AUTH_ERROR',
          payload: err?.response?.data?.error || 'Coś poszło nie tak, spróbuj ponownie.',
        })
      );
  };

  useEffect(() => () => setUserState({ type: 'CLEAR_AUTH_ERROR' }), []);

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="sign-in">
      <h3 className="sign-in__title" data-test="title">
        Zaloguj się
      </h3>
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__inputs-wrapper">
          {authError && <ErrorMessage error={authError} />}
          <CustomInput
            name="email"
            label="Email"
            aria-label="Email"
            data-test="input-email"
            value={userCredentials.email}
            handleChange={handleChange}
          />
          <CustomInput
            name="password"
            label="Hasło"
            aria-label="Hasło"
            data-test="input-password"
            type="password"
            value={userCredentials.password}
            handleChange={handleChange}
          />
        </div>
        <div className="sign-in__button-wrapper">
          <CustomButton data-test="submit">Zaloguj</CustomButton>
        </div>
        <div className="sign-in__spinner-wrapper">
          <Spinner isLoading={userLoading} />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
