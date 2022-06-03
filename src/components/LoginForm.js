import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { Button, InputLabel, TextField } from '@mui/material';

export const LoginForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  // object to store intial values
  // can change theses values in the object (formData) later
  const initialFormData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    // activateUser(formData.username);
    dispatch({
      type: 'setLoggedInUser',
      data: formData.username,
    });
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
