import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { Button, InputLabel, TextField } from '@mui/material';
import { signIn } from './services/authServices';

export const LoginForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  // object to store intial values
  // can change theses values in the object (formData) later
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn(formData)
      .then(({ username, jwt }) => {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('token', jwt);
        dispatch({
          type: 'setLoggedInUser',
          data: username,
        });

        dispatch({
          type: 'setToken',
          data: jwt,
        });
      })
      .catch((err) => console.error(err));
    setFormData(initialFormData); // resets formData state
    navigate('/messages'); // re-route to home ('/messages')
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
      <form onSubmit={handleSubmit}>
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
        {/* <input type="submit" value="Login" /> */}
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};