import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';

export const MessageForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, messageList } = store;
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
      addMessage(formData.text);
      clearMessage();
      navigate('/messages');
    }
    console.log(formData.text);
  };

  const addMessage = (text) => {
    const message = {
      id: messageList[0].id + 1, // UID as we add additional messages
      text: text,
      user: loggedInUser,
    };

    dispatch({
      type: 'addMessage',
      data: message, // appends to the top of messageList
    });
  };

  // function nextId(data) {
  //   if (data.length === 0) {
  //     return 1;
  //   }

  //   data.sort((a, b) => a.id - b.id);
  //   const nextId = data[data.length - 1].id + 1;
  //   return nextId;
  // }

  // clears the text area
  const clearMessage = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Message</label>
        <div>
          <textarea
            type="text"
            name="text"
            id="text"
            placeholder={`What's on your mind ${loggedInUser}?`}
            value={formData.text}
            onChange={handleFormData}
          ></textarea>
        </div>
        <input type="submit" value="Post" />
        <button onClick={clearMessage}>Clear</button>
      </form>
    </>
  );
};
