import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { Button, FormLabel, TextField } from '@mui/material';
import { createMessage } from './services/messagesServices';

export const MessageForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const initialFormData = {
    text: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    // adds the message to the list
    event.preventDefault();
    if (formData.text === '') {
      console.log('empty message');
    } else {
      addMessage(formData); // calls backend endpoint & updates state
      clearMessage();
      navigate('/messages');
    }
    console.log(formData.text);
  };

  const addMessage = (data) => {
    // data is an object we receive from the localState
    // & then submit a POST to our endpoint in messageServices
    createMessage(data).then((message) => {
      dispatch({
        type: 'addMessage',
        data: message,
      });
    });
  };

  // clears the text area
  const clearMessage = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormLabel>Message</FormLabel>
        <div>
          <TextField
            multiline={true}
            maxrows={4}
            type="text"
            name="text"
            id="text"
            placeholder={`What's on your mind ${loggedInUser}?`}
            value={formData.text}
            onChange={handleFormData}
          ></TextField>
        </div>
        {/* <input type="submit" value="Post" /> */}
        <Button variant="contained" type="submit" value="Post">
          Post
        </Button>
        <Button variant="contained" onClick={clearMessage}>
          Clear
        </Button>
      </form>
    </>
  );
};
