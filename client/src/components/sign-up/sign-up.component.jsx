import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import Spinner from '../spinner/spinner.component';

import { AppContext } from '../../hooks/useAppState';

import './sign-up.styles.scss';

const SignUp = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const {
    currentUser,
    setCurrentUser,
    setToken,
    userLoading,
    setUserLoading,
  } = useContext(AppContext);

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUserLoading(true);

    axios
      .post('/api/auth/signup', user)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        setToken(res.data.data.token);
        setCurrentUser(res.data.data.user);
        setUserLoading(false);
      })
      .catch(err => {
        localStorage.removeItem('token');
        setToken(null);
        setUserLoading(false);
        console.log(err.response.data.error);
      });
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="sign-up">
      <h3 className="sign-up__title">Zarejestruj się</h3>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <div className="sign-up__inputs-wrapper">
          <CustomInput
            name="name"
            label="Nazwa użytkownika"
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
