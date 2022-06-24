import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { signUp } from './services/authServices';
import React from 'react';

function SignUpForm() {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    signUp(formData).then((user) => {
      console.log(user);
      let errorMessage = '';
      if (user.error) {
        // convert the object into a string
        Object.keys(user.error).forEach((key) => {
          errorMessage = errorMessage.concat('', ` ${key} ${user.error[key]}`);
        });
        setError(errorMessage);
      } else {
        console.log(user.username, user.jwt);
        setError(null);
        dispatch({
          type: 'setLoggedInUser',
          data: user.username,
        });
        dispatch({
          type: 'setToken',
          data: user.jwt,
        });
        setFormData(initialFormData);
        navigate('/messages');
      }
    });
  };

  // include previous object, then assign key (id) a new value (value)
  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" style={{ margin: '5px 0' }}>
        Sign Up
      </Typography>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Username:</InputLabel>
          <TextField
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel>Email:</InputLabel>
          <TextField
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel>Password:</InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel>Confirm Password:</InputLabel>
          <TextField
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleFormData}
          />
        </div>
        {/* <input type="submit" value="Login" /> */}
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default SignUpForm;
