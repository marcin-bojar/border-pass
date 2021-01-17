import React, { useState, useContext } from 'react';
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
  const { setCurrentUser } = useContext(AppContext);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/auth/login', userCredentials)
      .then(res => setCurrentUser(res.data.data))
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput name="email" label="Email" handleChange={handleChange} />
      <CustomInput
        name="password"
        label="Password"
        handleChange={handleChange}
      />
      <CustomButton>Zaloguj</CustomButton>
    </form>
  );
};

export default SignIn;
