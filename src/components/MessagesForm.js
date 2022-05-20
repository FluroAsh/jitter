import { useState } from 'react';

const MessageForm = ({ loggedInUser, addMessage }) => {
  const initialFormData = {
    text: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });

    console.log(formData.text);
  };

  const handleSubmit = (event) => {
    // adds the message to the list
    event.preventDefault();
    if (formData.text === '') {
      console.log('empty message');
    } else {
      addMessage(formData.text);
      clearMessage();
    }
    console.log(formData.text);
  };

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

export default MessageForm;
