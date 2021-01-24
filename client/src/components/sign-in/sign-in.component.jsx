import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';

import { AppContext } from '../../hooks/useAppState';

import './sign-in.styles.scss';

const SignIn = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { currentUser, setCurrentUser, setToken } = useContext(AppContext);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/auth/login', userCredentials)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        setToken(res.data.data.token);
        setCurrentUser(res.data.data.user);
      })
      .catch(err => {
        localStorage.removeItem('token');
        setToken(null);
        if (err.response.status === 401 || err.response.status === 404)
          console.log('Podane dane są nieprawidłowe.');
        else console.log(err.response.status + ' ' + err.response.statusText);
      });
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="sign-in">
      <h3 className="sign-in__title">Zaloguj się</h3>
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <div className="sign-in__inputs-wrapper">
          <CustomInput
            name="email"
            label="Email"
            value={userCredentials.email}
            handleChange={handleChange}
          />
          <CustomInput
            name="password"
            label="Password"
            type="password"
            value={userCredentials.password}
            handleChange={handleChange}
          />
        </div>
        <CustomButton>Zaloguj</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
