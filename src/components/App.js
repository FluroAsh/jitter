import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import MessageForm from './MessagesForm';
import Messages from './Messages';
import initialMessageList from '../Data/message-list.json';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [messageList, setMessageList] = useState(initialMessageList);

  const activateUser = (username) => {
    setLoggedInUser(username);
  };

  useEffect(() => {
    // usually a fetch (but currently static in json)
    setMessageList(initialMessageList); // simulates the fetch
  }, []);

  const addMessage = (text) => {
    const message = {
      // TODO: needs refactoring, as we will be getting id: 4 every time...
      id: messageList.slice(-1).id + 1, // UID as we add additional messages
      text: text,
      user: loggedInUser,
    };

    setMessageList((messageList) => [message, ...messageList]);
  };

  return (
    <div className="App">
      <h1>Jitter</h1>
      <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
      {/* if no loggedInUser, render login form otherwise render message form*/}
      {!loggedInUser ? (
        <LoginForm activateUser={activateUser} />
      ) : (
        <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} />
      )}
      <Messages messageList={messageList} />
    </div>
  );
}

export default App;
