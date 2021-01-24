import React, { useState, useContext } from 'react';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';

import { AppContext } from '../../hooks/useAppState';

import './sign-up.styles.scss';

const SignUp = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/auth/signup', user)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        setCurrentUser(res.data.data.user);
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log(err.response.data.error);
      });
  };

  return (
    <div className="sign-up">
      <h3 className="sign-up__title">Zarejestruj się</h3>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <div className="sign-up__inputs-wrapper">
          <CustomInput
            name="name"
            label="Name"
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
            label="Password"
            type="password"
            value={user.password}
            handleChange={handleChange}
          />
        </div>
        <CustomButton>Zarejestruj</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
