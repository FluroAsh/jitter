import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ activateUser }) => {
  // object to store intial values
  // can change theses values in the object (formData) later
  const initialFormData = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    activateUser(formData.username);
    setFormData(initialFormData);
    navigate('/messages');
  };

  // include previous object, then assign key (id) a new value (value)
  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });

    console.log(formData.username, formData.password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormData}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
